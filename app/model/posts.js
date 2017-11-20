module.exports = app => {
  const mongoose = app.mongoose;
  const PostsSchema = new mongoose.Schema({
    title: { type: String  },
    desc: { type: String  },
    thumb: { type: Number  }
  });
  return mongoose.model('Posts', PostsSchema);
};