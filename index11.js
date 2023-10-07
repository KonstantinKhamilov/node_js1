const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Массив товаров
let products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
    // ...
];

// Middleware для валидации и приведения типов
function validateAndCast(req, res, next) {
    if (req.params.id) {
        req.params.id = Number(req.params.id);
    }
    if (req.query.price) {
        req.query.price = Number(req.query.price);
    }
    next();
}

app.use(cors()); // Добавьте эту строку для включения CORS
app.use(express.json()); // Для парсинга JSON в запросах
app.use(validateAndCast);

// Route для получения всех товаров
app.get('/products', (req, res) => {
    res.json(products);
});

// Route для получения товара по id
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    res.json(product);
});

// Route для фильтрации товаров по названию и цене
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

