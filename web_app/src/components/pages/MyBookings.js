import React from "react";
import styled from "styled-components";

const MyBookings = (props) => {

    const data = props.bookingData;

    const line = (props) => {
        const date = new Date(props.booked_date);
        const date_string = (date.getDate() + 1) + '-' + (date.getMonth() + 1) + '-' +  date.getFullYear();
        const seller_name = props.table.seller.name;
        const table_size = props.table.table_size;

        return (

                <Tr>
                    <Td>{seller_name}</Td>
                    <Td>{date_string}</Td>
                    <Td>{table_size}</Td>
                    <Td>{props.booked_time.start_time}:00 - {props.booked_time.end_time}:00</Td>
                </Tr>

        )
    }

    return (
        <MainDiv>
            <Table>
                <Tr>
                    <th>Restoran</th>
                    <th>Reservado para</th>
                    <th>Tamaño de la mesa</th>
                    <th>Hora de la reserva</th>
                </Tr>
                {/* <br/> */}
                {data.map(line)}
            </Table>
        </MainDiv>
    );
}

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-top: 1em;
    margin-bottom: 1em;
    
`;

const Table = styled.table`
    text-align: center
    border-collapse: collapse;
    width: 65%;
    margin-top: 1em;
    padding: 1em;
    margin-bottom: 1em;
    background-color: #f5f5f5;
    border-collapse: separate;
    border-spacing: 15px;
    border-radius: 10px;
`;


const Td = styled.td`
    font-size: 1rem;
    text-align: center  

`;


const MyBookingsDiv = styled.tbody`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70%;
    height: 100%;
    background-color: #f5f5f5;
    padding: 1rem;
    margin: 1rem;
    border-radius: 10px;
`;


const Tr = styled.tr`
    text-align: center  
    width: 100%;
    height: 100%;
    padding: 1rem;
    border-radius: 10px;
    font-color: black;
`;



export default MyBookings;