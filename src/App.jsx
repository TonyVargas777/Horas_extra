import React, { useState } from 'react';
import MonthSelector from '../components/MonthSelector';
import DayList from '../components/DayList';
import Results from '../components/Results';

const App = () => {
    const [selectedMonth, setSelectedMonth] = useState('2025-01'); // Mes y año por defecto
    const [daysData, setDaysData] = useState([]); // Almacena días, agentes y cantidad de trabajadores 

    return (
        <div className='container'> 
            <h1 className='container'>HORAS EXTRA</h1>
            <MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
            <DayList selectedMonth={selectedMonth} daysData={daysData} setDaysData={setDaysData} />
            <Results daysData={daysData} />
        </div>
    );
};

export default App;
