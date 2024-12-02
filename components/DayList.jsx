import React, { useEffect, useState } from 'react';

const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
};

const DayList = ({ selectedMonth, daysData, setDaysData }) => {
    const [days, setDays] = useState([]);

    useEffect(() => {
        const [year, month] = selectedMonth.split('-');
        const totalDays = getDaysInMonth(year, parseInt(month));
        const newDaysData = Array.from({ length: totalDays }, (_, i) => ({
            day: i + 1,
            agents: '',
            count: 2, 
        }));
        setDays(newDaysData);
        setDaysData(newDaysData); // Actualizamos el estado de los días
    }, [selectedMonth]); // Dependemos solo de 'selectedMonth' para refrescar los días

    const handleInputChange = (index, field, value) => {
        const updatedDays = [...days];
        updatedDays[index][field] = value;
        setDays(updatedDays);
        setDaysData(updatedDays); // Actualizamos el estado de los días 
    };

    return (
        <div className="container">
            {days.map((day, index) => (
                <div key={index}>
                    <label>
                        {`Dia ${day.day}:  `}
                        <input
                            type="text"
                            placeholder="Números de trabajadores"
                            value={day.agents}
                            onChange={(e) => handleInputChange(index, 'agents', e.target.value)}
                        />
                    </label>
                    <select
                        value={day.count}
                        onChange={(e) => handleInputChange(index, 'count', parseInt(e.target.value))}
                    >
                        {Array.from({ length: 10 }, (_, i) => (
                            <option key={i} value={i}>
                                {i}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
            <br />
            <div>* Rellenar los campos con los números de los empleados separados por guiones.</div>
            <div>* Seleccionar en el desplegable cuantos trabajadores necesitaremos ese dia.</div>
        </div>
    );
};

export default DayList;
