import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { MyButton } from '../SessionStyle';
import Cookies from 'js-cookie';


const NewCommentary = (data) => { 
    
    const seller_id = parseInt(useParams().sellerid);

    const HandleSubmit = (event) => {

        event.preventDefault();

        const user = Cookies.get('user');
        const newComment = event.target[0].value;
        const newScore = event.target[1].value;

        if (!user) {
            alert("Debes iniciar sesión para poder comentar");
            return;
        }

        const user_id = JSON.parse(user).userid;

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({
                user_id: user_id,
                seller_id: seller_id,
                comment: newComment,
                score: newScore,
            })
        };


        fetch(`https://grupo32-backend.herokuapp.com/comment/new-comment`, options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            }).then(_ => {
                data.update();
                event.target[0].value = ''
            }).catch(error => {
                // Agregar una vista x de error
                console.log(error);
            });
        
    }




    return (
        <form onSubmit={HandleSubmit}>
        <NewCommentaryDiv>
            <TextAreaDiv>
                <TextArea type="text" name="commentary" placeholder="Escribe tu comentario..."></TextArea>
            </TextAreaDiv>
            <ScoreDiv>
                <ScoreText>Calificación:</ScoreText>
                <ScoreInput type="number" name="score" min="1" max="10" step="1" defaultValue="1"></ScoreInput>
            </ScoreDiv>
            <ButtonDiv>
                <MyButton type='submit'>Enviar</MyButton>
            </ButtonDiv>
        </NewCommentaryDiv>
        </form>
    )
}

const NewCommentaryDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin: 0.5em;
    width: 100%;
    border-radius: 1em;
    overflow: nowrap;
`;

const TextAreaDiv = styled.div`
    width: 100%;
    height: auto;
`;

const TextArea = styled.textarea`
    width: 100%;
    min-height: 40px;
    padding: 1em;
    margin: 1em;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    word-wrap: break-word;
    resize: vertical;
`; 

const ButtonDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    border-radius: 1em;
    padding: 0.25em;
`;

const ScoreDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0.5em;
    padding: 0.5em;
`;

const ScoreText = styled.p`
    font-size: 1em;
    margin: 0.5em;
`;

const ScoreInput = styled.input`
    width: 5em;
    min-height: 40px;
    padding: 1em;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    word-wrap: break-word;
`;


export default NewCommentary