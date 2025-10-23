const express = require('express');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const router = express.Router();

// This function will be exported and will receive the 'db' object from server.js
module.exports = function(db) {

    // --- AUTH ROUTES ---
    router.post('/signup', async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const existingUser = await db.collection('users').findOne({ email: email });
            if (existingUser) { return res.status(409).json({ message: "Email already exists." }); }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            await db.collection('users').insertOne({ name, email, password: hashedPassword });
            res.status(201).json({ message: "User created successfully!" });
        } catch (err) { res.status(500).json({ message: "Error creating user." }); }
    });

    router.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await db.collection('users').findOne({ email: email });
            if (!user) { return res.status(401).json({ message: "Invalid credentials." }); }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) { return res.status(401).json({ message: "Invalid credentials." }); }
            res.status(200).json({ message: "Login successful!", user: { name: user.name, email: user.email } });
        } catch (err) { res.status(500).json({ message: "Error logging in." }); }
    });

    // --- PRODUCT & CART & ORDER ROUTES ---
    router.get('/products', async (req, res) => {
        try {
            const products = await db.collection('products').find({}).toArray();
            res.status(200).json(products);
        } catch (err) { res.status(500).json({ message: "Error fetching products." }); }
    });

    router.get('/cart/:email', async (req, res) => {
        try {
            const userEmail = req.params.email;
            let cart = await db.collection('carts').findOne({ userEmail: userEmail });
            if (!cart) { cart = { userEmail: userEmail, items: [] }; }
            res.status(200).json(cart);
        } catch (err) { res.status(500).json({ message: "Error fetching cart." }); }
    });

    router.post('/cart/update', async (req, res) => {
        try {
            const { userEmail, productId, quantity, productName, price } = req.body;
            const productObjectId = new ObjectId(productId);
            let cart = await db.collection('carts').findOne({ userEmail });
            if (!cart) { cart = { userEmail, items: [] }; }
            const itemIndex = cart.items.findIndex(item => item.productId.equals(productObjectId));
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
                if (cart.items[itemIndex].quantity <= 0) {
                    cart.items.splice(itemIndex, 1);
                }
            } else if (quantity > 0) {
                cart.items.push({ productId: productObjectId, name: productName, price, quantity });
            }
            await db.collection('carts').updateOne({ userEmail }, { $set: { items: cart.items } }, { upsert: true });
            res.status(200).json(cart);
        } catch (err) { console.error(err); res.status(500).json({ message: "Error updating cart." }); }
    });

    router.post('/checkout', async (req, res) => {
        try {
            const { userEmail, shippingAddress, shippingMethod } = req.body;
            const cart = await db.collection('carts').findOne({ userEmail });
            if (!cart || cart.items.length === 0) { return res.status(400).json({ message: "Cart is empty." }); }
            
            for (const item of cart.items) {
                const product = await db.collection('products').findOne({ _id: new ObjectId(item.productId) });
                if (!product || product.stock < item.quantity) { return res.status(400).json({ message: `Not enough stock for ${item.name}.` }); }
            }
            
            for (const item of cart.items) {
                await db.collection('products').updateOne({ _id: new ObjectId(item.productId) },{ $inc: { stock: -item.quantity } });
            }
            
            const totalAmount = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const order = { userEmail, items: cart.items, totalAmount, shippingAddress, shippingMethod, orderDate: new Date() };
            const insertResult = await db.collection('orders').insertOne(order);
            await db.collection('carts').deleteOne({ userEmail });
            
            const newOrder = await db.collection('orders').findOne({ _id: insertResult.insertedId });
            res.status(200).json({ message: "Order placed successfully!", order: newOrder });
        } catch (err) { console.error(err); res.status(500).json({ message: "Error during checkout." }); }
    });

    router.get('/orders/:email', async (req, res) => {
        try {
            const userEmail = req.params.email;
            const orders = await db.collection('orders').find({ userEmail: userEmail }).sort({ orderDate: -1 }).toArray();
            res.status(200).json(orders);
        } catch (err) { res.status(500).json({ message: "Error fetching order history." }); }
    });

    return router;
};