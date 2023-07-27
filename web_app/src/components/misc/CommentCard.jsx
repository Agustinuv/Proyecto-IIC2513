import styled from 'styled-components';
import { useState } from 'react';
import Cookies from "js-cookie";

import { MyButton } from '../SessionStyle'



const CommentCard = (data) => {

    const [updateMode, setUpdateMode] = useState(false);

    const changeMode = () => {
        setUpdateMode(!updateMode);
    }

    const deleteComment = () => {

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
        };

        fetch(`https://grupo32-backend.herokuapp.com/comment/delete-comment/${data.comment.id}`, options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            }).then(_ => {
                data.update();

            }).catch(error => {
                // Agregar una vista x de error
                console.log(error);
            });
    }

    const HandleSubmit = (event) => {

        event.preventDefault();

        const newComment = event.target[0].value;
        const newScore = event.target[1].value;

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({
                id: data.comment.id,
                user_id: data.comment.user_id,
                seller_id: data.comment.seller_id,
                comment: newComment,
                score: newScore,
            })
        };

        fetch(`https://grupo32-backend.herokuapp.com/comment/edit-comment`, options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            }).then(_ => {
                data.update();
                setUpdateMode(false);
            }).catch(error => {
                // Agregar una vista x de error
                console.log(error);
            });
    }


    const authorization = () => {

        try {
            const user = JSON.parse(Cookies.get('user'));

            if (user) {

                if (user.userid === data.comment.user_id || user.admin === true || user.moderator === true) {
                    return (
                        <div className="crud-buttons">
                            <MyButton className="edit" onClick={() => changeMode()} >Editar</MyButton>
                            <MyButton className="delete" onClick={() => { deleteComment() }}>Eliminar</MyButton>
                        </div>
                    )
                }
            }
        } catch (error) {
            return null;
        }
    }

    if (updateMode) {
        return (
            <div className="cust-container">

                <form onSubmit={HandleSubmit}>

                    <EditCommentaryDiv>
                        <img src={data.img} alt="Avatar" style={{ width: "90px" }} />
                        <ColumnDiv>
                            <p><span>{data.comment.user.fullName}</span> </p>

                            <RowDiv>

                                <TextAreaDiv>
                                    <TextArea type="text" name="commentary" placeholder="Escribe tu comentario..." defaultValue={data.comment.commentary}></TextArea>
                                </TextAreaDiv>

                                <ScoreDiv>
                                    <ScoreText>Calificación:</ScoreText>
                                    <ScoreInput name="score" type="number" min="1" max="10" step="1" defaultValue={data.comment.score}></ScoreInput>
                                </ScoreDiv>

                            </RowDiv>

                        </ColumnDiv>
                    </EditCommentaryDiv>

                    <ButtonDiv>
                        <MyButton type='submit'>Guardar</MyButton>
                        <MyButton className="edit" onClick={() => changeMode()} >Cancelar</MyButton>
                    </ButtonDiv>

                </form>
            </div >
        )

    } else {

        return (
            <div className="cust-container">
                <img src={data.img} alt="Avatar" style={{ width: "90px" }} />
                <p><span>{data.comment.user.fullName}</span> Nota: {data.comment.score} </p>
                <p>{data.comment.commentary}</p>

                {authorization()}
            </div>
        )
    }

};



const ColumnDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 20px;
    width: 80%;
    position: relative;
    `;

const RowDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin: 0.5em;
    width: 100%;
    border-radius: 1em;
    overflow: nowrap;
    `;

const EditCommentaryDiv = styled.div`
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
    justify-content:flex-end;
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

export default CommentCard;