import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

let petSchema = new Schema({
  name: {
    // the pet's name, need not be unique
    type: String,
    required: true,
  },
  category: {
    // the type of pet (i.e. dog, cat, rabbit)
    type: String,
    required: true,
  },
  description: {
    type: String,
    max: 255,
  },
  imageUris: {
    // URIs representing images of the pet
    type: [String],
  },
  archived: {
    // archived pets are meant to be hidden without deleting
    type: Boolean,
    default: false,
  },
});

petSchema.plugin(mongoosePaginate);

const Pet = mongoose.model('Pet', petSchema, 'pets');

export default Pet;
