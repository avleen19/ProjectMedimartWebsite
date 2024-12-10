
const express = require('express');
const Product = require('../models/Product'); 

const router = express.Router();

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/products', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        category: req.body.category,
    });
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        product.name = req.body.name;
        product.price = req.body.price;
        product.imageUrl = req.body.imageUrl;
        product.description = req.body.description;
        product.category = req.body.category;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await product.remove();
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/products/search', async (req, res) => {
    const { q } = req.query;
    try {
        const products = await Product.find({ name: new RegExp(q, 'i') }); 
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/products/:category', async (req, res) => {
    try {
        const category = req.params.category; 
        const products = await Product.find({ category: category });  
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products by category' });
    }
});
  router.post('/purchase/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product.quantity <= 0) {
        return res.status(400).json({ message: 'Out of Stock' });
      }
      product.quantity -= 1;
      await product.save();
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error purchasing product' });
    }
  });
module.exports = router;
