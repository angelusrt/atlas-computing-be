const mongoose = require("mongoose")
const { Schema, SchemaTypes } = mongoose

const PostSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  authorID: {
    type: SchemaTypes.ObjectId,
    ref: 'Dev',
    required: true
  },
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
  tags: {
    type: [String],
    length: 16,
    required: true
  },
  content:{
    type: [{}],
    required: true,
    language: {
      type: String,
      required: true,
      length: 32,
      unique: true
    },
    title: {
      type: String,
      length: 64,
      required: true
    },
    markdown: {
      type: String,
      required: true
    }
  }
})

module.exports = mongoose.model('Post', PostSchema)