// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const productsRouter = require('./productsRouter');

app.use(cors());
app.use(express.json());
app.use('/products', productsRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
