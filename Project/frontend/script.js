document.addEventListener('DOMContentLoaded', () => {
    
    // --- Toast Notification Function ---
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => { toast.classList.add('show'); }, 100);
        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => toast.remove());
        }, 3000);
    }

    // --- Element Selections ---
    const allProductGrids = document.querySelectorAll('.product-grid');
    const cartSidebar = document.getElementById('cart-sidebar');
    const openCartBtn = document.getElementById('open-cart-btn');
    const cartItemCount = document.getElementById('cart-item-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const checkoutBtn = document.getElementById('checkout-btn');
    const loginModal = document.getElementById('login-modal');
    const loginOpenBtn = document.getElementById('login-open-btn');
    const loginCloseBtn = document.getElementById('login-close-btn');
    const loginForm = document.getElementById('login-form');
    const signupModal = document.getElementById('signup-modal');
    const signupCloseBtn = document.getElementById('signup-close-btn');
    const signupForm = document.getElementById('signup-form');
    const showSignupLink = document.getElementById('show-signup-link');
    const showLoginLink = document.getElementById('show-login-link');
    const userProfileContainer = document.getElementById('user-profile-container');
    const userMenu = document.getElementById('user-menu');
    const userIcon = document.getElementById('user-icon');
    const logoutBtn = document.getElementById('logout-btn');
    const usernameDisplay = document.getElementById('username-display');
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    let loggedInUser = null;

    // --- Core Functions ---
    async function fetchAndRenderProducts() {
        const productPage = document.getElementById('all-products');
        const featuredGrid = document.getElementById('featured-products-grid');
        if (!productPage && !featuredGrid) return;

        try {
            const response = await fetch('http://localhost:3000/products');
            if (!response.ok) throw new Error('Network response was not ok');
            const products = await response.json();
            
            if (productPage) {
                const categories = {
                    "Local Goan Drinks": document.getElementById('drinks-grid'),
                    "Sweets & Desserts": document.getElementById('sweets-grid'),
                    "Spices & Masalas": document.getElementById('spices-grid'),
                    "Bakery & Breads": document.getElementById('bakery-grid'),
                    "Pickles & Preserves": document.getElementById('pickles-grid')
                };
                Object.values(categories).forEach(grid => { if(grid) grid.innerHTML = ''; });
                products.forEach(p => {
                    const grid = categories[p.category];
                    if (grid) {
                        const card = document.createElement('div');
                        card.className = 'product-card';
                        card.innerHTML = `
                            <img src="${p.imageUrl}" alt="${p.name}">
                            <h3>${p.name}</h3>
                            <p class="price">₹${p.price}</p>
                            <button class="add-to-cart-btn" data-product-id="${p._id}" data-product-name="${p.name}" data-product-price="${p.price}">Add to List</button>
                        `;
                        grid.appendChild(card);
                    }
                });
            }

            if (featuredGrid) {
                featuredGrid.innerHTML = '';
                products.slice(0, 4).forEach(p => {
                    const card = document.createElement('div');
                    card.className = 'product-card';
                    card.innerHTML = `
                        <img src="${p.imageUrl}" alt="${p.name}">
                        <h3>${p.name}</h3>
                        <p class="price">₹${p.price}</p>
                        <button class="add-to-cart-btn" data-product-id="${p._id}" data-product-name="${p.name}" data-product-price="${p.price}">Add to List</button>
                    `;
                    featuredGrid.appendChild(card);
                });
            }
        } catch (err) {
            console.error("Failed to load products:", err);
            if(productPage) document.querySelector('#all-products .container').innerHTML = '<h2>Our Goan Specialties</h2><p style="text-align: center;">Could not load products. Please ensure the backend server is running.</p>';
        }
    }

    function renderCart(cart) {
        const cartTotalPriceEl = document.getElementById('cart-total-price');
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;
        let totalItems = 0;
        if (!cart || !cart.items || cart.items.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align:center; padding: 20px;">Your cart is empty.</p>';
        } else {
            cart.items.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <div class="cart-item-details">
                        <span class="cart-item-name">${item.name}</span>
                        <div class="cart-item-controls">
                            <button class="quantity-btn" data-product-id="${item.productId}" data-change="-1">-</button>
                            <span class="cart-item-quantity">${item.quantity}</span>
                            <button class="quantity-btn" data-product-id="${item.productId}" data-change="1">+</button>
                            <button class="remove-btn" data-product-id="${item.productId}">×</button>
                        </div>
                    </div>
                    <div class="cart-item-price">₹${item.price * item.quantity}</div>
                `;
                cartItemsContainer.appendChild(itemEl);
                totalPrice += item.price * item.quantity;
                totalItems += item.quantity;
            });
        }
        if (cartTotalPriceEl) cartTotalPriceEl.textContent = `₹${totalPrice}`;
        if (cartItemCount) {
            cartItemCount.textContent = totalItems;
            cartItemCount.classList.toggle('visible', totalItems > 0);
        }
    }

    async function fetchCart() {
        if (!loggedInUser) return;
        try {
            const response = await fetch(`http://localhost:3000/cart/${loggedInUser.email}`);
            const cart = await response.json();
            renderCart(cart);
        } catch (err) { console.error('Failed to fetch cart:', err); }
    }
    
    async function updateCartItem(productId, quantity, productName, price) {
        if (!loggedInUser) return;
        try {
            const response = await fetch('http://localhost:3000/cart/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userEmail: loggedInUser.email, productId, quantity, productName, price })
            });
            const updatedCart = await response.json();
            if (response.ok) { renderCart(updatedCart); } 
            else { showToast(updatedCart.message || "Failed to update cart.", "error"); }
        } catch (err) { console.error('Failed to update cart:', err); }
    }

    async function handleAddToCart(e) {
        if (!e.target.classList.contains('add-to-cart-btn')) return;
        if (!loggedInUser) {
            showToast("Please log in to add items to your cart.", "error");
            return;
        }
        const btn = e.target;
        showToast(`Added ${btn.dataset.productName} to cart!`);
        if(cartSidebar) cartSidebar.classList.add('open');
        updateCartItem(btn.dataset.productId, 1, btn.dataset.productName, parseFloat(btn.dataset.productPrice));
    }

    function handleCartInteraction(e) {
        const target = e.target;
        const productId = target.dataset.productId;
        if (!productId) return;
        if (target.classList.contains('quantity-btn')) {
            const change = parseInt(target.dataset.change, 10);
            updateCartItem(productId, change);
        }
        if (target.classList.contains('remove-btn')) {
            const cartItemDiv = target.closest('.cart-item');
            const quantitySpan = cartItemDiv.querySelector('.cart-item-quantity');
            const currentQuantity = parseInt(quantitySpan.textContent, 10);
            updateCartItem(productId, -currentQuantity);
        }
    }

    const showLoggedInState = (user) => {
        loggedInUser = user;
        if(loginOpenBtn) loginOpenBtn.classList.add('hidden');
        if(userProfileContainer) userProfileContainer.classList.remove('hidden');
        if(usernameDisplay) usernameDisplay.textContent = user.name || user.email.split('@')[0];
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        fetchCart();
    };

    const handleLogout = () => {
        loggedInUser = null;
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('shippingDetails');
        renderCart(null);
        showToast('Logout successful!');
        setTimeout(() => { window.location.href = 'index.html'; }, 1000);
    };

    async function initializeCheckoutPage() {
        const shippingForm = document.getElementById('shipping-form');
        if (!shippingForm) return;
        const summaryContainer = document.getElementById('summary-items-container');
        const summaryTotal = document.getElementById('summary-total-price');
        if (!loggedInUser) return;
        const response = await fetch(`http://localhost:3000/cart/${loggedInUser.email}`);
        const cart = await response.json();
        if (!cart || cart.items.length === 0) {
            showToast("Your cart is empty.", "error");
            window.location.href = 'products.html';
            return;
        }
        summaryContainer.innerHTML = '';
        let totalPrice = 0;
        cart.items.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'summary-item';
            itemEl.innerHTML = `<span>${item.name} (x${item.quantity})</span><strong>₹${item.price * item.quantity}</strong>`;
            summaryContainer.appendChild(itemEl);
            totalPrice += item.price * item.quantity;
        });
        summaryTotal.textContent = `₹${totalPrice}`;
        shippingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const shippingDetails = {
                fullName: document.getElementById('fullName').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                pincode: document.getElementById('pincode').value,
                shippingMethod: document.querySelector('input[name="shippingMethod"]:checked').value,
            };
            localStorage.setItem('shippingDetails', JSON.stringify(shippingDetails));
            window.location.href = 'billing.html';
        });
    }

    async function initializeBillingPage() {
        const paymentForm = document.getElementById('payment-form');
        if (!paymentForm) return;
        const shippingDetails = JSON.parse(localStorage.getItem('shippingDetails'));
        if (!loggedInUser || !shippingDetails) {
            showToast("Something went wrong. Please start checkout again.", "error");
            window.location.href = 'checkout.html';
            return;
        }
        const response = await fetch(`http://localhost:3000/cart/${loggedInUser.email}`);
        const cart = await response.json();
        const reviewAddress = document.getElementById('review-shipping-address');
        const reviewItems = document.getElementById('review-items-container');
        const reviewTotal = document.getElementById('review-total-price');
        reviewAddress.innerHTML = `<p><strong>${shippingDetails.fullName}</strong></p><p>${shippingDetails.address},</p><p>${shippingDetails.city}, ${shippingDetails.pincode}</p>`;
        reviewItems.innerHTML = '';
        let totalPrice = 0;
        cart.items.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'summary-item';
            itemEl.innerHTML = `<span>${item.name} (x${item.quantity})</span><strong>₹${item.price * item.quantity}</strong>`;
            reviewItems.appendChild(itemEl);
            totalPrice += item.price * item.quantity;
        });
        reviewTotal.textContent = `₹${totalPrice}`;
        paymentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const checkoutResponse = await fetch('http://localhost:3000/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userEmail: loggedInUser.email, shippingAddress: shippingDetails, shippingMethod: shippingDetails.shippingMethod })
                });
                const data = await checkoutResponse.json();
                if (checkoutResponse.ok) {
                    localStorage.removeItem('shippingDetails');
                    localStorage.setItem('confirmedOrder', JSON.stringify(data.order));
                    window.location.href = 'confirmation.html';
                } else { showToast(data.message, "error"); }
            } catch (err) { showToast("Could not place order. Server error.", "error"); }
        });
    }
    
    function initializeConfirmationPage() {
        const confirmAddress = document.getElementById('confirm-shipping-address');
        if (!confirmAddress) return;
        const confirmedOrder = JSON.parse(localStorage.getItem('confirmedOrder'));
        if (!loggedInUser || !confirmedOrder) {
            window.location.href = 'index.html';
            return;
        }
        const address = confirmedOrder.shippingAddress;
        confirmAddress.innerHTML = `<p><strong>${address.fullName}</strong></p><p>${address.address},</p><p>${address.city}, ${address.pincode}</p>`;
        localStorage.removeItem('confirmedOrder');
    }

    async function fetchAndRenderOrders() {
        const container = document.getElementById('order-history-container');
        if (!container || !loggedInUser) return;
        try {
            const response = await fetch(`http://localhost:3000/orders/${loggedInUser.email}`);
            const orders = await response.json();
            if (orders.length === 0) {
                container.innerHTML = '<p>You have no past orders.</p>';
                return;
            }
            container.innerHTML = '';
            orders.forEach(order => {
                const orderCard = document.createElement('div');
                orderCard.className = 'order-card';
                const orderDate = new Date(order.orderDate).toLocaleDateString('en-GB');
                let itemsHtml = order.items.map(item => `<div class="order-item"><span class="order-item-name">${item.name}</span><span class="order-item-details">Qty: ${item.quantity}</span></div>`).join('');
                orderCard.innerHTML = `<div class="order-header"><span>Order Date: ${orderDate}</span><span class="order-total">Total: ₹${order.totalAmount}</span></div><div class="order-items-list">${itemsHtml}</div>`;
                container.appendChild(orderCard);
            });
        } catch (err) {
            container.innerHTML = '<p>Could not load your order history.</p>';
            console.error(err);
        }
    }
    
    // --- Initial Load & Page Logic ---
    loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    fetchAndRenderProducts();
    if (loggedInUser) {
        showLoggedInState(loggedInUser);
    }
    
    const pageContent = document.body.querySelector('main > section');
    if (pageContent) {
        const pageId = pageContent.id;
        if ((pageId === 'profile-page' || pageId === 'order-history-page' || pageId === 'checkout-page' || pageId === 'billing-page' || pageId === 'confirmation-page') && !loggedInUser) {
            showToast("You must be logged in to view this page.", "error");
            window.location.href = 'index.html';
        } else {
            if (pageId === 'profile-page' && loggedInUser) {
                document.getElementById('profile-name').textContent = loggedInUser.name;
                document.getElementById('profile-email').textContent = loggedInUser.email;
            }
            if (pageId === 'order-history-page') { fetchAndRenderOrders(); }
            if (pageId === 'checkout-page') { initializeCheckoutPage(); }
            if (pageId === 'billing-page') { initializeBillingPage(); }
            if (pageId === 'confirmation-page') { initializeConfirmationPage(); }
        }
    }
    
    // --- Event Listeners ---
    document.body.addEventListener('click', handleAddToCart);
    if(cartItemsContainer) cartItemsContainer.addEventListener('click', handleCartInteraction);
    if(openCartBtn) openCartBtn.addEventListener('click', () => cartSidebar && cartSidebar.classList.add('open'));
    if(cartCloseBtn) cartCloseBtn.addEventListener('click', () => cartSidebar && cartSidebar.classList.remove('open'));
    if(checkoutBtn) checkoutBtn.addEventListener('click', () => { window.location.href = 'checkout.html'; });
    if (loginOpenBtn) loginOpenBtn.addEventListener('click', () => loginModal && loginModal.classList.remove('hidden'));
    if (loginCloseBtn) loginCloseBtn.addEventListener('click', () => loginModal && loginModal.classList.add('hidden'));
    if (signupCloseBtn) signupCloseBtn.addEventListener('click', () => signupModal && signupModal.classList.add('hidden'));
    if (showSignupLink) { showSignupLink.addEventListener('click', (e) => { e.preventDefault(); loginModal.classList.add('hidden'); signupModal.classList.remove('hidden'); }); }
    if (showLoginLink) { showLoginLink.addEventListener('click', (e) => { e.preventDefault(); signupModal.classList.add('hidden'); loginModal.classList.remove('hidden'); }); }
    if (userIcon) userIcon.addEventListener('click', () => userMenu && userMenu.classList.toggle('hidden'));
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    const profileLogoutBtn = document.getElementById('profile-logout-btn');
    if (profileLogoutBtn) profileLogoutBtn.addEventListener('click', handleLogout);
    if (hamburger) hamburger.addEventListener('click', () => mobileNav && mobileNav.classList.toggle('active'));

    // --- Form Submissions ---
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const errorMessage = document.getElementById('login-error-message');
            if (errorMessage) errorMessage.style.display = 'none';
            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await response.json();
                if (response.ok) { showToast('Login successful!'); showLoggedInState(data.user); loginModal.classList.add('hidden'); loginForm.reset();
                } else { if (errorMessage) {errorMessage.textContent = data.message; errorMessage.style.display = 'block';} }
            } catch (err) { if (errorMessage) {errorMessage.textContent = "Could not connect to the server."; errorMessage.style.display = 'block';} }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const errorMessage = document.getElementById('signup-error-message');
            if (errorMessage) errorMessage.style.display = 'none';
            try {
                const response = await fetch('http://localhost:3000/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });
                const data = await response.json();
                if (response.ok) { showToast('Account created! Please log in.'); signupModal.classList.add('hidden'); signupForm.reset(); loginModal.classList.remove('hidden');
                } else { if (errorMessage) {errorMessage.textContent = data.message; errorMessage.style.display = 'block';} }
            } catch (err) { if (errorMessage) {errorMessage.textContent = "Could not connect to the server."; errorMessage.style.display = 'block';} }
        });
    }
});