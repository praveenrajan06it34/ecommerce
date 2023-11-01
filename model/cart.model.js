module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
        cartID: String,
        productID: String,
        totalPrice: Number,
        quantity: Number
    });
    schema.method("toJSON", function(){
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });
    const cart = mongoose.model("carts", schema);
    return cart;
}