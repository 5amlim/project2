const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema(
    {
        rating: {type: Number},
        comment: String,
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model ('Rating', ratingSchema);