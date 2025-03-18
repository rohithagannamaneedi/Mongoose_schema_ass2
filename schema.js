const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
    userName:{
        type: String
    },
    message:{
        type: String,
        required: true
    },
    commentedAt:{
        type:Date,
        default: Date.now
    },
});
const blogPostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength: 5,
        unique: true
    },
    content:{
        type: String,
        required: true,
        minlength: 50
    },
    author:{
        type: String
    },
    tags:{
        type: [String]
    },
    category:{
        type: String,
        default: "General"
    },
    likes:{
        type: [String]
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date
    },
    comments:[commentSchema],
});

blogPostSchema.pre("save", function (next) {
    if (!this.isNew) {
      this.updatedAt = Date.now();
    }
    next();
  });

const blogPost = mongoose.model("blogPost",blogPostSchema);
const comment = mongoose.model("comment",commentSchema);

module.exports = {blogPost,comment};