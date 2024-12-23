// Path to your Excel file
const excelFilePath = './data/DIRECTORY_LAGOS_PROVINCE_48.xlsx';

// Variables to hold the original data and headers
let originalData = [];
let headers = [];

// Function to load and parse the Excel file
async function loadExcelFile() {
    const response = await fetch(excelFilePath);
    const data = await response.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 }); // Convert to JSON

    // Save original data and headers
    headers = sheetData[0]; // First row as headers
    originalData = sheetData.slice(1); // Remaining rows as data

    displayTable([headers, ...originalData]); // Display the full table
    addSearchBar(); // Add the search bar for filtering
}

// Function to add a search bar
function addSearchBar() {
    const searchBar = document.getElementById('location-search-bar');

    // Event listener for filtering data based on search input
    searchBar.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase(); // Convert search term to lowercase
        const filteredData = searchTerm
            ? originalData.filter(row => row[5]?.toLowerCase().includes(searchTerm)) // Filter based on column index 5 (location)
            : originalData; // Show all data if the search term is empty

        // If no matching data, show "No data found"
        if (filteredData.length === 0) {
            displayNoDataMessage();
        } else {
            // Re-display the table with filtered data
            displayTable([headers, ...filteredData]); // Include headers
        }
    });
}

// Function to display "No data found" message
function displayNoDataMessage() {
    const table = document.getElementById('data-table');
    table.innerHTML = ''; // Clear any existing content

    const rowElement = document.createElement('tr');
    const cellElement = document.createElement('td');
    cellElement.textContent = 'No Location Found';
    cellElement.colSpan = headers.length; // Span across all columns
    cellElement.style.textAlign = 'center'; // Center align the text
    rowElement.appendChild(cellElement);

    table.appendChild(rowElement);
}

// Function to display the table
function displayTable(data) {
    const table = document.getElementById('data-table');
    table.innerHTML = ''; // Clear any existing content

    data.forEach((row, rowIndex) => {
        const rowElement = document.createElement('tr');
        row.forEach(cell => {
            const cellElement = document.createElement(rowIndex === 0 ? 'th' : 'td'); // Use <th> for header row
            cellElement.textContent = cell || ''; // Add cell content
            rowElement.appendChild(cellElement);
        });
        table.appendChild(rowElement);
    });
}

// Load the Excel file on page load
window.addEventListener('DOMContentLoaded', loadExcelFile);
