const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId,  required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String, required: false }, // Ensure this is correct
    productName: { type: String, required: true }, // Ensure this is correct
});
subscriptionSchema.statics.checkSubscription = async function (userId, productId) {
    const existingSubscription = await this.findOne({
        userId: userId,
        productId: productId,
        endDate: { $gte: new Date() }, // Active if endDate is in the future
    });

    return !existingSubscription; // Return true if no active subscription, false otherwise
};

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
