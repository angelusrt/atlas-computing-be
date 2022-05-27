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
    linkedin: {
      type: String,
      required: false
    },
    instagram: {
      type: String,
      required: false
    },
    github: {
      type: String,
      required: false
    },
    portfolio: {
      type: String,
      required: false
    },
  }
})

module.exports = mongoose.model('Dev', DevSchema)