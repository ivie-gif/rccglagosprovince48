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

    populateDropdown(originalData); // Populate the location dropdown
    displayTable([headers, ...originalData]); // Display the full table
}

// Function to populate the dropdown
function populateDropdown(data) {
    const locationDropdown = document.getElementById('location-dropdown');
    const locations = [...new Set(data.map(row => row[5]))]; // Assuming "Church Address" is in column index 2

    // Add default "All Locations" option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'All Locations';
    locationDropdown.appendChild(defaultOption);

    // Add unique locations to the dropdown
    locations.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        locationDropdown.appendChild(option);
    });

    // Add event listener for filtering
    locationDropdown.addEventListener('change', filterTableByLocation);
}

// Function to filter the table by selected location
function filterTableByLocation() {
    const selectedLocation = document.getElementById('location-dropdown').value;
    const filteredData = selectedLocation
        ? originalData.filter(row => row[5] === selectedLocation) // Filter based on column index 2
        : originalData; // Show all data if no location is selected

    // Re-display the table with filtered data
    displayTable([headers, ...filteredData]); // Include headers
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
