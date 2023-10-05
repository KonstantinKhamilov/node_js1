// productsController.js
let products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
    // ...
];

exports.getAllProducts = (req, res) => {
    res.json(products);
};

exports.getProductById = (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    res.json(product);
};

exports.filterProducts = (req, res) => {
    let filteredProducts = products;
    if (req.query.name) {
        filteredProducts = filteredProducts.filter(p => p.name.includes(req.query.name));
    }
    if (req.query.price) {
        filteredProducts = filteredProducts.filter(p => p.price <= req.query.price);
    }
    res.json(filteredProducts);
};
