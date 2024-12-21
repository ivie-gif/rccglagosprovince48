// // Path to your Excel file
// const excelFilePath = './data/LP48_ZONES.xlsx';

// // Function to load and parse the Excel file
// async function loadExcelFile() {
//     const response = await fetch(excelFilePath);
//     const data = await response.arrayBuffer();
//     const workbook = XLSX.read(data, { type: 'array' });
//     const sheetName = workbook.SheetNames[0]; // Get the first sheet
//     const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 }); // Convert to JSON
//     displayTable(sheetData);
// }

// // Function to display the table
// function displayTable(data) {
//     const table1 = document.getElementById('data-table-1');
//     table1.innerHTML = ''; // Clear any existing content

//     data.forEach((row, rowIndex) => {
//         const rowElement = document.createElement('tr');
//         row.forEach((cell) => {
//             const cellElement = document.createElement(rowIndex === 0 ? 'th' : 'td'); // Use <th> for header row
//             cellElement.textContent = cell || ''; // Add cell content
//             rowElement.appendChild(cellElement);
//         });
//         table1.appendChild(rowElement);
//     });
// }

// // Load the Excel file on page load
// window.addEventListener('DOMContentLoaded', loadExcelFile);















// Path to your Excel files
const excelFilePath1 = './data/LP48_ZONES.xlsx';
const excelFilePath2 = './data/Areas_in_zones.xlsx';

// Function to load and parse the first Excel file
async function loadExcelFile1() {
    const response = await fetch(excelFilePath1);
    const data = await response.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 }); // Convert to JSON
    displayTable1(sheetData);
}

// Function to load and parse the second Excel file
async function loadExcelFile2() {
    const response = await fetch(excelFilePath2);
    const data = await response.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 }); // Convert to JSON
    displayTable2(sheetData);
}

// Function to display the first table
function displayTable1(data) {
    const table1 = document.getElementById('data-table-1');
    table1.innerHTML = ''; // Clear any existing content

    data.forEach((row, rowIndex) => {
        const rowElement = document.createElement('tr');
        row.forEach((cell) => {
            const cellElement = document.createElement(rowIndex === 0 ? 'th' : 'td'); // Use <th> for header row
            cellElement.textContent = cell || ''; // Add cell content
            rowElement.appendChild(cellElement);
        });
        table1.appendChild(rowElement);
    });
}

// Function to display the second table
function displayTable2(data) {
    const table2 = document.getElementById('data-table-2');
    table2.innerHTML = ''; // Clear any existing content

    data.forEach((row, rowIndex) => {
        const rowElement = document.createElement('tr');
        row.forEach((cell) => {
            const cellElement = document.createElement(rowIndex === 0 ? 'th' : 'td'); // Use <th> for header row
            cellElement.textContent = cell || ''; // Add cell content
            rowElement.appendChild(cellElement);
        });
        table2.appendChild(rowElement);
    });
}

// Load the Excel files on page load
window.addEventListener('DOMContentLoaded', () => {
    loadExcelFile1();  // Load the first Excel file
    loadExcelFile2();  // Load the second Excel file
});
