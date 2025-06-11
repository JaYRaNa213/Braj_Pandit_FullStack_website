import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  author: { type: String, required: true, trim: true },
  tags: { type: [String], default: [] },
  category: {
    type: String,
    enum: ['Puja', 'Festival', 'Aarti', 'Religious Books'],
    required: true
  },
  imageUrl: { type: String},
  publishedAt: { type: Date, default: Date.now },
  Comments: [{
    user: { type: String },
    comment: { type: String},
    createdAt: { type: Date, default: Date.now }
  }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
