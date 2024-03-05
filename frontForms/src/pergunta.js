import React, { useEffect, useState } from "react";
import axios from "axios";
import './pergunta.css';
import './index.css'
import  { useParams,useNavigate } from "react-router-dom";

function Pergunta() {
  const url = "http://localhost:8001/questions";
  const { _id } = useParams();
  const navigate= useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionário, setQuestionário] = useState([]);


  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const response = await axios.get(url);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleAnswerChange(newAnswer) {
    setQuestionário((prevQuestionário) => {
      const updatedQuestionário = [...prevQuestionário];
      updatedQuestionário[currentQuestionIndex] = newAnswer;
      return updatedQuestionário;
    });
  }

  async function handleSubmit() {
 
    const nCpf = _id
  
    const dataToSend = posts.map((post, index) => ({
     questionário: post.respostas,
      resposta:questionário[index],
      pergunta: post.perguntas,
    }));
  try{
    await axios.post('http://localhost:8001/respostas', {  
      _id:nCpf,
      
     questionário: dataToSend,
    });
      alert('Respostas enviadas com sucesso!');
      navigate("/")
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <div className="App" >  
      <div  className="Colum"> 
        <div className="cont">
 
      {currentQuestionIndex < posts.length ? (
        <div>
          <p className="cen">{posts[currentQuestionIndex].perguntas}</p>
      
          <input
            className="wrap-res"
            type="text"
            placeholder="Digite sua resposta..."
            value={questionário[currentQuestionIndex] || ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
          />
          <div>
            <button className="butto"  onClick={() => setCurrentQuestionIndex((prevIndex) => prevIndex + 1)}>
              Próximo
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>Todas as perguntas respondidas!</p><br></br>
          <center><p>Obrigada  :)</p></center>
          <div className="container-Finalizar-form-btn">
            <button className="Finalizar-form-btn"
            onClick={handleSubmit}>Enviar questionario
            </button>
          </div>
      
        </div>
      )}
    
      <p _id={_id ? Number.parseInt(_id,10):null}/>
      </div>
    </div>
    </div>
  );
}

export default Pergunta;




