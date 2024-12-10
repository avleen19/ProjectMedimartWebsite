const express = require('express');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Sale = require('./models/Sales');
const stripe = require('stripe')('sk_test_51QNXL0Ezjpdl2chbMqNv9zM46ZqDJtZU7rsaM89rGP5ypQlozkU6r8iKE8ELOcBY5U8Z6PLttH95w3zGQAMnlx5z009waBTa65');

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', 
}));

require('dotenv').config();
// Middleware
// app.use(cors());
// app.use(express.json());
// app.use(session({
//     secret: 'yourSecret',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }
// }));

const MONGODB_URI = 'mongodb+srv://avleenkaur1904:newmongo@cluster0.m2oyo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully.'))
.catch((err) => console.log('MongoDB connection error:', err));

const JWT_SECRET = process.env.JWT_SECRET;

const User = require('./models/User');
const Product = require('./models/Product');

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, isAdmin: user.isAdmin });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

app.get('/admin', (req, res) => {
    res.send('Welcome Admin!');
});
app.post('/api/sign-up', async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).json({ message: 'User created successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
app.get('/api/products', async (req, res) => {
    const { q, category } = req.query;
    const filter = {};
    if (q) filter.name = { $regex: q, $options: 'i' };
    if (category) filter.category = category;

    try {
        const products = await Product.find(filter);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products.' });
    }
});

app.post('/api/products', async (req, res) => {
    const { name, price, description, imageUrl, category, quantity } = req.body;

    if (!name || !price || !description || !imageUrl || !category || !quantity) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newProduct = new Product({ name, price, description, imageUrl, category, quantity });
    await newProduct.save();
    return res.status(201).json(newProduct);
});

app.put('/api/products/:id', async (req, res) => {
    const { name, price, description, imageUrl, category, quantity } = req.body;
    const { id } = req.params;
    
    try {
        if (!name || !price || !description || !imageUrl || !category || !quantity) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, description, imageUrl, category, quantity }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ message: 'Error updating product' });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting product.' });
    }
});

// Contact API
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    const contactMessage = { name, email, message, date: new Date() };

    const filePath = path.join(__dirname, 'data', 'message.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err && err.code === 'ENOENT') {
            return fs.writeFile(filePath, JSON.stringify([contactMessage], null, 2), (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error saving message.' });
                }
                return res.status(200).json({ message: 'Message saved successfully!' });
            });
        } else if (err) {
            return res.status(500).json({ error: 'Error reading file.' });
        }
        let messages;
        try {
            messages = JSON.parse(data);
        } catch (parseError) {
            messages = [];
        }
        messages.push(contactMessage);

        fs.writeFile(filePath, JSON.stringify(messages, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error saving message.' });
            }
            return res.status(200).json({ message: 'Message saved successfully!' });
        });
    });
});

// Stripe Checkout API
app.post('/api/checkout', async (req, res) => {
    const { token, amount } = req.body;

    try {
        const charge = await stripe.charges.create({
            amount,
            currency: 'inr',
            source: token,
            description: 'Test charge',
        });
        const sale = new Sale({
            products: req.body.products, 
            totalAmount: amount / 100,
            paymentStatus: charge.status,
            receiptUrl: charge.receipt_url,
        });

        await sale.save(); 
        res.status(200).json({
            success: true,
            receiptUrl: charge.receipt_url,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Payment failed!' });
    }
});
app.get('/api/sales', async (req, res) => {
    try {
        const sales = await Sale.find().sort({ transactionDate: -1 });
        console.log("Sales Data:", sales);  
        res.json(sales);
    } catch (error) {
        console.error('Error fetching sales data:', error);
        res.status(500).json({ error: 'Error fetching sales data.' });
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
