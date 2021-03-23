import mongoose from "mongoose";

const Schema = mongoose.Schema;

let petSchema = new Schema({
    id: String,
    active: Boolean,
    name: String,
    category: String
});

const Pet = mongoose.model("Pet", petSchema, "pets");

export default Pet;
    