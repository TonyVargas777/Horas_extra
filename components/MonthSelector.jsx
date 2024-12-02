import React from 'react';

const MonthSelector = ({ selectedMonth, setSelectedMonth }) => {
    return (
        <div className="container">
            <label htmlFor="month">Selecciona mes y año:</label> 
            <input
                id="month"
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
            />
        </div>
    );
};

export default MonthSelector;
