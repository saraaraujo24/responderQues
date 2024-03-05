const express = require("express")
const morgan = require("morgan");
const app = express();
const mongoose = require('mongoose')
const cors = require("cors");

const bodyParser= require("body-parser");

app.use(morgan("dev"));
app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



// Conexão com o banco de dados MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/questions', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Model do documento
const Post = mongoose.model('Post', {
  perguntas: String,
 
});

// Rota para salvar os dados
app.post('/questions', async (req, res) => {
  try {
    const { perguntas} = req.body;

    const post = new Post({ perguntas});

    await post.save();

    res.json({ message: 'Dados salvos com sucesso!'});
  
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao salvar dados' });
  }
});


// Rota para salvar os dados
app.get('/questions', async (req, res) => {
  try {
    console.log(req.query);

    res.json({ message: 'Perguntas salvas com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao salvar dados' });
  }
});


app.listen(8000, ()=> {
    console.log("Rodando");
})