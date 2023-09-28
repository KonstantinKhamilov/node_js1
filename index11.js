const express = require('express');
const app = express();
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

app.use(express.json()); // Для парсинга JSON в запросах

// Route для добавления нового товара
app.post('/products', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var newProduct = req.body;
        dbo.collection("products").insertOne(newProduct, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
    res.send('Product added!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
