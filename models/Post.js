import mongoose from "mongoose"
const mongoose = require("mongoose")
const { Schema, SchemaTypes } = require("mongoose")

const PostSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
    required
  },
  authorID: {
    type: SchemaTypes.ObjectId,
    ref: 'Dev',
    required
  },
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
  tags: {
    type: [String],
    length: 16,
    required
  },
  title: {
    type: String,
    length: 64,
    required
  },
  body: {
    section: {
      type: [{}],
      required,
      mode: {
        type: String,
        required
      },
      title: {
        type: String,
        length: 32,
        required
      },
      paragraphs: {
        type: [String],
        length: 256,
        required
      }
    }
  }
})

module.exports = mongoose.model('Chat', PostSchema)