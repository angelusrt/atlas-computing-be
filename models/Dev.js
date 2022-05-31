const mongoose = require("mongoose")
const { Schema } = mongoose

const DevSchema = new Schema({
  authorName: {
    type: String,
    length: 32,
    required: true 
  },
  authorDescription: {
    type: String,
    length: 64,
    required: true
  },
  email: {
    type: String,
    length: 32,
    required: true
  },
  telephone: {
    type: String, 
    length: 16,
    required: true
  },
  socials: {
    type: [{}],
    minlength: 1,
    name: {
      type: String,
      length: 16,
      required: true
    },
    iconName: {
      type: String,
      length: 16,
      required: true
    },
    link: {
      type: String,
      length: 64,
      required: true
    }
  }
})

module.exports = mongoose.model('Dev', DevSchema)