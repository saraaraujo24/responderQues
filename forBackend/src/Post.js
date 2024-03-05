
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  _id: {
    Cpf: String, 
  },
  respostas:Array,

})

const Post = mongoose.model('Form', postSchema); // Nomeie o modelo como Form

module.exports = Post;


