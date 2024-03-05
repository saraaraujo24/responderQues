const express = require("express")
const morgan = require("morgan");
const app = express();
const mongoose = require('mongoose')
const cors = require("cors");
const bodyParser= require("body-parser");
//const autoIncrement = require('mongoose-auto-increment').plugin;

app.use(morgan("dev"));
app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



mongoose.connect('mongodb://0.0.0.0:27017/questions', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});

/*const RespostaSechma = {
  Cpf:Number,
  respostas:Array

}

const Respostamodel =mongoose.model("Resposta", RespostaSechma)*/


const Resposta = mongoose.model('Resposta',({
  _id:Number,
  questionário:Array 
}));

// Model do documento
const Post = mongoose.model('Perguntas', {
  perguntas: String,
 
});

app.get('/questions', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao obter dados' });
  }
});



  app.post("/respostas", async (req, res) => {
    try {
      const { _id,questionário } = req.body;
  
      if (_id === null) {
        return res.status(400).json({ error: "_id cannot be null" });
      }
     
      const resposta = new Resposta({
        _id, 
        questionário,
      });
    
      await resposta.save();
  
      res.json({ message: "Dados salvos com sucesso!", data: resposta });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao salvar dados" });
    }
  });
  
app.listen(8001, ()=> {
    console.log("Rodando");
})


