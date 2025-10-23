const express = require('express');

const app = express();

app.get('/',(req, res) => {
    res.send('hello from class!');
});
app.get('/student',(req, res) => {
        res.json([
            "kutbuddin","OK"
            ])
        })

    app.listen(3000, () =>{
        console.log('Listening on 3000');
    });
