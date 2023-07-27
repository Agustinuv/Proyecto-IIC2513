import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import Calendar from './Calendar';
import Cookies from 'js-cookie';
import { MyButton } from '../SessionStyle';
import { useNavigate } from "react-router-dom";


const BookedTable = (props) => {

    const [selectedDay, setSelectedDay] = useState(null);
    const [availableSize, setAvailableSize] = useState([0]);
    const [tableSize, setTableSize] = useState(1);
    const [showBookTime, setShowBookTime] = useState(false);
    const [availableTime, setAvailableTime] = useState({});
    const [chosenHour, setChosenHour] = useState()

    const seller_id = useParams().restaurantId;
    const user_id = JSON.parse(Cookies.get('user')).userid;

    const navigate = useNavigate();


    useEffect(() => {

        const getAllSizes = () => {

            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            fetch(`/table/get-table-sizes/${seller_id}`, options)
                .then(res => res.json())
                .then(data => {
                    setAvailableSize(data.table_sizes);
                    setTableSize(data.table_sizes[0]);
                }
                ).catch(err => console.log(err));
        };

        return () => {
            getAllSizes();
        };
    }, [seller_id]);

    const handlegender = (e) => {
        setChosenHour(e.target.value)
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        setShowBookTime(true);


        console.log(`Selected day: ${selectedDay}`);
        console.log(`Table size: ${tableSize}`);

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        fetch(`/booked_table/get-tables/${seller_id}/${tableSize}/${selectedDay}`, options)
            .then(res => res.json())
            .then(output => {
                console.log(output);
                setAvailableTime(output);
            }).catch(err => console.log(err));
    }

    const handleReservationSubmit = (e) => {

        e.preventDefault();

        console.log(`Selected day: ${selectedDay}`);
        console.log(`Table size: ${tableSize}`);
        console.log(`Hour id: ${chosenHour}`);
        console.log(`Chosen hour: ${availableTime[chosenHour].hour}`);
        console.log(`Seller id: ${seller_id}`);
        console.log(`User id: ${user_id}`);


        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: user_id,
                seller_id: parseInt(seller_id),
                table_size: parseInt(tableSize),
                date: selectedDay,
                hour_id: parseInt(chosenHour)
            })
        };

        fetch(`/booked_table/new-booking`, options)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert(data.message);
                navigate('/');
            }).catch(err => {
                if (err.message === "No hay mesas disponibles") {
                    alert('No hay mesas hora seleccionada. Recarga la pestaña para intentarlo de nuevo.');
                };
                console.log(err);
            });
    }


    const showHours = () => {

        if (Object.keys(availableTime).length > 0) {

            return (
                <TableSizeForm onSubmit={handleReservationSubmit}>
                    <HourDiv>
                        <h3>Horas disponibles para {tableSize} personas</h3>
                        {Object.keys(availableTime).map(key => {

                            let avalable_count = availableTime[key].availables;
                            let availabe = avalable_count > 0;
                            let time = availableTime[key].time;

                            return (
                                <Line available={availabe} id={key} hour={time} tables={avalable_count} handlegender={handlegender} />
                            );
                        })}
                    </HourDiv>
                    <div>
                        <MyButton3 type="submit">Reservar</MyButton3>
                    </div>
                </TableSizeForm>
            )
        }
    }


    return (
        <>
            <MainDiv>
                <Calendar setSelectedDay={setSelectedDay} />

                <TableSizeForm onSubmit={handleSubmit}>
                    <Text>Tamaño de la mesa</Text>
                    <SelectInput name="table_size" onChange={(e) => setTableSize(e.target.value)}>
                        {availableSize.map(size => {
                            return (
                                <option key={size} value={size}>{size}</option>
                            )
                        })}
                    </SelectInput>
                    <MyButton2 type="submit">Buscar mesas</MyButton2>
                </TableSizeForm>

                {showBookTime && showHours()}

            </MainDiv>
        </>
    );
}


const Line = (props) => {

    const { available, id, hour, tables, handlegender } = props;

    return (
        <RowHourDiv>
            <input type="radio" id={id} name={`hour`} value={id} disabled={(!available)} onChange={handlegender} />
            <label for={id}>{`Entre ${hour} (${tables} mesas)`}</label>
        </RowHourDiv>
    );
}



const MainDiv = styled.div`
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    background-color: #f5f5f5;
                    border-radius: 10px;
                    padding: 10px;
                    margin-top: 100px;
                    `;


const TableSizeForm = styled.form`
                    display: flex;
                    height: fit-content;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    margin: 3em;
                    `;

const Text = styled.p`
                    font-size: 16px;
                    color: #333;
                    font-weight: bold;
                    `;

const SelectInput = styled.select`
                    width: 100px;
                    font-size: 16px;
                    min-height: 40px;
                    text-align: center;
                    display: inline-block;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    box-sizing: border-box;
                    word-wrap: break-word;
                    `;

const MyButton2 = styled(MyButton)`
                    margin-top: 5em;
                    `;

const MyButton3 = styled(MyButton)`
                    margin: 1em;
                    `;

const HourDiv = styled.div`
                    display: flex;
                    flex-direction: column;
                    `;

const RowHourDiv = styled.div`
                    display: flex;
                    flex-direction: row;
                    `;


export default BookedTable;
