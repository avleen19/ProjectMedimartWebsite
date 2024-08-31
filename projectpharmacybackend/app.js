const express = require('express');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const app = express();
const fs = require('fs');
const path = require('path');
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
  }));

app.use(express.json());
app.use(session({
  secret: 'yourSecret',
  resave: false,
  saveUninitialized: false,
}));

let products = [
    { id: 1, name: 'Test Tube', price: '₹200', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnXfysxkcncvNOnX6F3DaZ6HqBRZfUh3lGesg70bvyzRFCMkJzcTG-V0TFeLuX04qQJL0&usqp=CAU' },
    { id: 2, name: 'LabMicroscope', price: '₹2000', image: 'https://cdn.shopify.com/s/files/1/2407/1409/articles/Laboratory_Microscope.jpg?v=1684147132' },
    { id: 3, name: 'Dropper', price: '₹250', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQioPgxADrkCzHybiX-K1-omw9-kfMhGJ3Tg&s' },
    { id: 4, name: 'Oxygen Mask', price: '₹800', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwPdJjj28Hv0eWrYc9mAoIVYLM8BrHaUxR5SFWDYL_opSc-ooctC55uC2L1Lv2RgsqemY&usqp=CAU' },
    { id: 5, name: 'Stethoscope', price: '₹1500', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIVSB6BcLnAqpaL4P4Q2K9tMryckoReTUdo8vZcgmYhRgoaOytYlod_mACNsY5AZYocuU&usqp=CAU' },
    { id: 6, name: 'Digital BP Machine', price: '₹1200', image: 'https://smartmedicalbuyer.com/cdn/shop/products/niscomed-niscomed-aneroid-blood-pressure-bp-monitor-pw-217-22566982484141.jpg?v=1604316570' },
    { id: 7, name: 'Thermometer', price: '₹300', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Vo5BLYbDZbcwqe5_YAvzaUE0tDFongbPMuDMXRUgoalV1rDnjYW4iHuSre0xYL90zmg&usqp=CAU' },
    { id: 8, name: 'Surgical Syringe', price: '₹400', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMHJje9v_1oPDmpFiNYCrDNNkIr0OM07afsw&s' },
    { id: 9, name: 'LabMicroscope', price: '₹2000', image: 'https://cdn.shopify.com/s/files/1/2407/1409/articles/Laboratory_Microscope.jpg?v=1684147132' },
    { id: 10, name: 'Dropper', price: '₹250', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQioPgxADrkCzHybiX-K1-omw9-kfMhGJ3Tg&s' },
    { id: 11, name: 'Oxygen Mask', price: '₹800', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwPdJjj28Hv0eWrYc9mAoIVYLM8BrHaUxR5SFWDYL_opSc-ooctC55uC2L1Lv2RgsqemY&usqp=CAU' },
    { id: 12, name: 'Stethoscope', price: '₹1500', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIVSB6BcLnAqpaL4P4Q2K9tMryckoReTUdo8vZcgmYhRgoaOytYlod_mACNsY5AZYocuU&usqp=CAU' },
    { id: 13, name: 'Digital BP Machine', price: '₹1200', image: 'https://smartmedicalbuyer.com/cdn/shop/products/niscomed-niscomed-aneroid-blood-pressure-bp-monitor-pw-217-22566982484141.jpg?v=1604316570' },
    { id: 14, name: 'Thermometer', price: '₹300', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Vo5BLYbDZbcwqe5_YAvzaUE0tDFongbPMuDMXRUgoalV1rDnjYW4iHuSre0xYL90zmg&usqp=CAU' },
    { id: 15, name: 'Surgical Syringe', price: '₹400', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMHJje9v_1oPDmpFiNYCrDNNkIr0OM07afsw&s' },
    { id: 16, name: 'Surgical Syringe', price: '₹400', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMHJje9v_1oPDmpFiNYCrDNNkIr0OM07afsw&s' },
  ];
  
  app.get('/api/products', (req, res) => {
    const query = req.query.q.toLowerCase();
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(query)
    );
    res.json(filteredProducts);
  });


  app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
  
    if (name && email && message) {
      const contactMessage = { name, email, message };
      const filePath = path.join(__dirname, 'data', 'message.json');
  
      fs.readFile(filePath, (err, data) => {
        if (err && err.code === 'ENOENT') {
          // File doesn't exist, so create it with the initial data
          fs.writeFile(filePath, JSON.stringify([contactMessage], null, 2), (err) => {
            if (err) {
              return res.status(500).json({ error: 'Error saving message.' });
            }
            res.status(200).json({ message: 'Message saved successfully!' });
          });
        } else if (err) {
          return res.status(500).json({ error: 'Error reading file.' });
        } else {
          let messages;
          try {
            messages = JSON.parse(data);
          } catch (parseError) {
            // Handle parsing errors (e.g., empty or malformed JSON)
            messages = [];
          }
          messages.push(contactMessage);
          fs.writeFile(filePath, JSON.stringify(messages, null, 2), (err) => {
            if (err) {
              return res.status(500).json({ error: 'Error saving message.' });
            }
            res.status(200).json({ message: 'Message saved successfully!' });
          });
        }
      });
    } else {
      res.status(400).json({ error: 'All fields are required!' });
    }
  });

app.use('/api', authRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
