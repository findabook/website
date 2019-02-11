const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    author: String,
    resume: String,
    condition: {type: String, enum: ["New", "Used"]},
    quantity: Number,
    categories: [{ type: String, enum: ["thriller", "novel", "terror", "police", "children", "romantic", "adventures", "politics", "comedy"]}],
    actualOwners: [{ type: Schema.Types.ObjectId, ref: "User" }],
    oldOwners: [{ type: Schema.Types.ObjectId, ref: "User" }],
})

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;