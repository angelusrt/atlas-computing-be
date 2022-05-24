import mongoose from "mongoose"
const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const DevSchema = new Schema({
  authorName: {
    type: String,
    length: 32,
    required
  },
  authorDescription: {
    type: String,
    length: 64,
    required
  },
  email: {
    type: String,
    length: 32,
    required
  },
  telephone: {
    type: String, 
    length: 16,
    required
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

module.exports = mongoose.model('Chat', DevSchema)