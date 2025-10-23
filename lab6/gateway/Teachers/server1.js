const express = require('express');
const port=4001;
const app = express();

app.get('/getteachers',(req, res) => {
   res.json({users:["Mahadev","sir"]
   });
});

app.listen(port, () =>{
        console.log('Listening on 4001');
});