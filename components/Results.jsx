import React, { useState } from "react";
import generateExcel from "../utils/excelGenerator";

const Results = ({ daysData }) => {
  // Estados para el mes y año seleccionados
  const [selectedMonth, setSelectedMonth] = useState("01"); // Mes inicial (enero)
  const [selectedYear, setSelectedYear] = useState("2025"); // Año inicial (2025)
  const [assignments, setAssignments] = useState([]);
  const [workerSchedule, setWorkerSchedule] = useState([]);
  const [showResults, setShowResults] = useState(false); // Estado para controlar la visibilidad de los resultados

  // Función para manejar el cambio de mes
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Función para manejar el cambio de año
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const calculateAssignments = () => {
    // Resetear las estructuras de seguimiento cada vez que se calcula
    const agentCounts = {}; // Lleva el conteo de días trabajados por cada trabajador
    const workerDays = {}; // Lleva un listado de días asignados por cada trabajador

    const results = daysData.map((day) => {
      const availableAgents = day.agents.split("-").map(Number); // Convertir agentes a números
      availableAgents.forEach((agent) => {
        if (!agentCounts[agent]) {
          agentCounts[agent] = 0;
          workerDays[agent] = [];
        }
      });

      // Ordenar agentes disponibles por los días trabajados
      const sortedAgents = availableAgents.sort(
        (a, b) => agentCounts[a] - agentCounts[b]
      );

      // Seleccionar los agentes necesarios según el recuento mínimo
      const selectedAgents = sortedAgents.slice(0, day.count);

      // Actualizar las cuentas de asignaciones
      selectedAgents.forEach((agent) => {
        agentCounts[agent]++;
        workerDays[agent].push(day.day);
      });

      return { day: day.day, agents: selectedAgents };
    });

    // Actualizar los estados con los nuevos cálculos
    setAssignments(results);

    // Convertir workerDays en un array legible para exportar, añadiendo el total de días trabajados
    const scheduleArray = Object.keys(workerDays).map((worker) => ({
      Agent: worker,
      Days: workerDays[worker].join(", "),
      TotalDays: workerDays[worker].length, // Número total de días trabajados por ese agente
    }));

    setWorkerSchedule(scheduleArray);

    // Mostrar los resultados al hacer el cálculo
    setShowResults(true);
  };

  const exportToExcel = () => {
    // Crear el nombre del archivo usando el mes y año seleccionados
    const fileName = `Bonus_Arset_${selectedMonth}_${selectedYear}.xlsx`;
    generateExcel(assignments, workerSchedule, fileName); // Pasamos el nombre del archivo a la función de exportación
  };

  return (
    <div className="container">
      <button onClick={calculateAssignments}>Cálculo de horas extra</button>

      {/* Mostrar la lista de asignaciones solo si 'showResults' es verdadero */}
      {showResults && (
        <> 
          <h3>Trabajadores y dias assignados:</h3>
          <ul>
            {assignments.map((result, index) => (
              <li key={index}>
                {`Dia ${result.day}: ${result.agents.join(", ")}`}
              </li>
            ))}
          </ul>

          <ul>
            {workerSchedule.map((worker, index) => (
              <li key={index}>
                {`Trabajador ${worker.Agent}: Dias - ${worker.Days}, Total Dias - ${worker.TotalDays}`}
              </li>
            ))}
          </ul>
          <button onClick={exportToExcel}>Exportar a Excel</button>
        </>
      )}
    </div>
  );
};

export default Results;
