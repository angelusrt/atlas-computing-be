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
  title: {
    type: String,
    length: 64,
    required: true
  },
  body: {
    section: {
      type: [{}],
      required: true,
      title: {
        type: String,
        length: 32,
        required: true
      },
      paragraphs: {
        type: [{}],
        minlength: 1,
        image:{
          type: [String],
          length: 32,
          required: false
        },
        text:{
          type: String,
          length: 512,
          required: true,
        },
        mode:{
          type: String,
          length: 16,
          required: true
        }
      }
    }
  }
})

module.exports = mongoose.model('Post', PostSchema)