const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: { type: String, unique: true },
		password: String,
		location: String,
		preferences: [{ type: String, enum: ["thriller", "novel", "terror", "police", "children", "romantic", "adventures", "politics", "comedy"]}],
		chats: [{ type: Schema.Types.ObjectId, ref: "Chat" }]
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

const User = mongoose.model("User", userSchema);
module.exports = User;
	