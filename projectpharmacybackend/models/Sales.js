
const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    products: [{
        name: String,
        price: Number,
        quantity: Number,
        totalPrice: Number,
    }],
    totalAmount: Number,
    paymentStatus: String,
    transactionDate: {
        type: Date,
        default: Date.now
    },
    receiptUrl: String
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
