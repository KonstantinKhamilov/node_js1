const express = require('express');
const app = express();
const port = 3000;

// Масив товарів
let products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 }
];

// Middleware для валідації та приведення типів
function validateAndCast(req, res, next) {
    if (req.params.id) {
        req.params.id = Number(req.params.id);
    }
    if (req.query.price) {
        req.query.price = Number(req.query.price);
    }
    next();
}

app.use(validateAndCast);

// Route для отримання всіх товарів
app.get('/products', (req, res) => {
    res.json(products);
});

// Route для отримання товару за id
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    res.json(product);
});

// Route для фільтрації товарів за назвою та ціною
app.get('/products/filter', (req, res) => {
    let filteredProducts = products;
    if (req.query.name) {
        filteredProducts = filteredProducts.filter(p => p.name.includes(req.query.name));
    }
    if (req.query.price) {
        filteredProducts = filteredProducts.filter(p => p.price <= req.query.price);
    }
    res.json(filteredProducts);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
