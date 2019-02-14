const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    author: String,
    resume: String,
    quantity: Number,
    imageUrl: String,
    categories: Array,
    actualOwners: [{ type: Schema.Types.ObjectId, ref: "User" }],
    oldOwners: [{ type: Schema.Types.ObjectId, ref: "User" }],
})

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;