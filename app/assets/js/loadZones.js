// Path to your Excel files
const excelFilePath1 = './data/LP48_Zones.xlsx';
const excelFilePath2 = './data/Areas_in_zones.xlsx';

// Variables to hold the original data and headers
let zoneHQData = [];
let zoneAreasData = [];
let zoneHQHeaders = [];
let zoneAreasHeaders = [];

// Function to load and parse the first Excel file
async function loadExcelFile1() {
    try {
        const response = await fetch(excelFilePath1);
        const data = await response.arrayBuffer();
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 }); // Convert to JSON

        // Save headers and data
        zoneHQHeaders = sheetData[0];
        zoneHQData = sheetData.slice(1);

        populateDropdown('zoneHQ-dropdown', zoneHQData, 4); // Populate dropdown for Church Address (column index 4)
        displayTable1([zoneHQHeaders, ...zoneHQData]);
    } catch (error) {
        console.error('Error loading LP48_Zones.xlsx:', error);
    }
}

// Function to load and parse the second Excel file
async function loadExcelFile2() {
    try {
        const response = await fetch(excelFilePath2);
        const data = await response.arrayBuffer();
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 }); // Convert to JSON

        // Save headers and data
        zoneAreasHeaders = sheetData[0];
        zoneAreasData = sheetData.slice(1);

        populateDropdown('zoneAreas-dropdown', zoneAreasData, 4); // Populate dropdown for Church Address (column index 4)
        displayTable2([zoneAreasHeaders, ...zoneAreasData]);
    } catch (error) {
        console.error('Error loading Areas_in_zones.xlsx:', error);
    }
}

// Function to populate a dropdown with unique values from a specific column
function populateDropdown(dropdownId, data, columnIndex) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = ''; // Clear existing options

    // Collect unique values from the specified column
    const uniqueValues = [...new Set(data.map(row => row[columnIndex]).filter(Boolean))];

    // Add default "All" option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'All Locations';
    dropdown.appendChild(defaultOption);

    // Add unique values to the dropdown
    uniqueValues.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        dropdown.appendChild(option);
    });

    // Attach event listener for filtering
    dropdown.addEventListener('change', () => filterTable(dropdownId));
}

// Function to filter the table based on the selected dropdown value
function filterTable(dropdownId) {
    if (dropdownId === 'zoneHQ-dropdown') {
        const selectedValue = document.getElementById('zoneHQ-dropdown').value;
        const filteredData = selectedValue
            ? zoneHQData.filter(row => row[4] === selectedValue) // Filter by Church Address (column index 4)
            : zoneHQData; // Show all data if no value is selected

        displayTable1([zoneHQHeaders, ...filteredData]);
    } else if (dropdownId === 'zoneAreas-dropdown') {
        const selectedValue = document.getElementById('zoneAreas-dropdown').value;
        const filteredData = selectedValue
            ? zoneAreasData.filter(row => row[4] === selectedValue) // Filter by Church Address (column index 4)
            : zoneAreasData; // Show all data if no value is selected

        displayTable2([zoneAreasHeaders, ...filteredData]);
    }
}

// Function to display the first table
function displayTable1(data) {
    const table1 = document.getElementById('data-table-1');
    table1.innerHTML = ''; // Clear any existing content

    data.forEach((row, rowIndex) => {
        const rowElement = document.createElement('tr');
        row.forEach(cell => {
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
        row.forEach(cell => {
            const cellElement = document.createElement(rowIndex === 0 ? 'th' : 'td'); // Use <th> for header row
            cellElement.textContent = cell || ''; // Add cell content
            rowElement.appendChild(cellElement);
        });
        table2.appendChild(rowElement);
    });
}

// Load the Excel files on page load
window.addEventListener('DOMContentLoaded', () => {
    loadExcelFile1(); // Load the first Excel file
    loadExcelFile2(); // Load the second Excel file
});
