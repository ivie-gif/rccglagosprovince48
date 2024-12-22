// Path to your Excel file
const excelFilePath = './data/DIRECTORY_LAGOS_PROVINCE_48.xlsx';

// Function to load and parse the Excel file
async function loadExcelFile() {
    const response = await fetch(excelFilePath);
    const data = await response.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 }); // Convert to JSON
    displayTable(sheetData);
}

// Function to display the table
function displayTable(data) {
    const table = document.getElementById('data-table');
    table.innerHTML = ''; // Clear any existing content

    data.forEach((row, rowIndex) => {
        const rowElement = document.createElement('tr');
        row.forEach((cell) => {
            const cellElement = document.createElement(rowIndex === 0 ? 'th' : 'td'); // Use <th> for header row
            cellElement.textContent = cell || ''; // Add cell content
            rowElement.appendChild(cellElement);
        });
        table.appendChild(rowElement);
    });
}

// Load the Excel file on page load
window.addEventListener('DOMContentLoaded', loadExcelFile);
