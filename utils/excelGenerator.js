import * as XLSX from 'xlsx';

const generateExcel = (assignments, workerSchedule, fileName) => { 
    // Crear una nueva hoja para "Assignacions" (días y agentes asignados)
    const assignmentSheet = assignments.map(result => ({
        Dia: result.day,
        Trabajadores: result.agents.join(', '),
    }));

    // Crear una nueva hoja para "Treballadors" (trabajadores y días)
    const workersSheet = workerSchedule.map(worker => ({
        Trabajadores: worker.Agent,
        Dias: worker.Days,
        Total: worker.TotalDays
    }));

    // Crear un libro de trabajo con las hojas
    const wb = XLSX.utils.book_new();
    
    // Añadir la hoja de "Assignacions"
    const wsAssignments = XLSX.utils.json_to_sheet(assignmentSheet);
    XLSX.utils.book_append_sheet(wb, wsAssignments, 'Asignaciones');

    // Añadir la hoja de "Treballadors"
    const wsWorkers = XLSX.utils.json_to_sheet(workersSheet);
    XLSX.utils.book_append_sheet(wb, wsWorkers, 'Trebajadores');
    
    // Generar el archivo Excel con el nombre adecuado
    XLSX.writeFile(wb, 'Horas_extra.xlsx');
};

export default generateExcel;
