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
exports.createProduct = (req, res) => {
    const newProduct = req.body;
    newProduct.id = products.length + 1; // Присвоить новому товару ID
    products.push(newProduct);
    res.json(newProduct);
};

exports.deleteProduct = (req, res) => {
    const productId = req.params.id;
    products = products.filter(p => p.id !== productId); // Удалить товар из массива
    res.json({ message: `Product with id ${productId} deleted` });
};