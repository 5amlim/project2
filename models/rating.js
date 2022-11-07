const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const ingredientSchema = new Schema(
    {
        restrictions: {type: String, enum: ["vegan", "low cal"]},
        items: String,
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model ('Ingredient', ingredientSchema);