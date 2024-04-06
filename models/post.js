import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: String,
    categories: String,
    imgUrl: String,
    article: String,
    author: String,
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
