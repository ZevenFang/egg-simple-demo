module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema({
    username: { type: String  },
    password: { type: String  },
    age: { type: Number  }
  });
  return mongoose.model('Users', UserSchema);
};