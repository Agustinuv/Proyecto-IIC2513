// Inspirado en el código de https://react-day-picker.js.org/

import 'react-day-picker/dist/style.css';

import React, { useState } from 'react';
import styled from 'styled-components';

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';

export default function Calendar(props) {

    const today = new Date();
    const tomorrow = today.setDate(today.getDate() + 1);
    const nextWeek = today.setDate(today.getDate() + 7);
    const [selectedDay, setSelectedDay] = useState(today);

    props.setSelectedDay(format(selectedDay, 'yyyy-MM-dd'));

    return (
        <CalendarDiv>
            <DayPicker
                mode="single"
                required
                selected={selectedDay}
                onSelect={setSelectedDay}
                fromDate={tomorrow}
                toDate={nextWeek}
            />
        </CalendarDiv>
    );
}


const CalendarDiv = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    `;