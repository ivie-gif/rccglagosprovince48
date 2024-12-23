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

        // Populate search input field and display table
        populateSearchInput('zoneHQ-search', zoneHQData, 4); // For Church Address (column index 4)
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

        // Populate search input field and display table
        populateSearchInput('zoneAreas-search', zoneAreasData, 4); // For Church Address (column index 4)
        displayTable2([zoneAreasHeaders, ...zoneAreasData]);
    } catch (error) {
        console.error('Error loading Areas_in_zones.xlsx:', error);
    }
}

// Function to populate a search input field
function populateSearchInput(searchId, data, columnIndex) {
    const searchInput = document.getElementById(searchId);
    searchInput.value = ''; // Clear existing input value

    // Attach event listener for typing search term
    searchInput.addEventListener('input', () => filterTable(searchId, data, columnIndex));
}

// Function to filter the table based on the search term
function filterTable(searchId, data, columnIndex) {
    const searchTerm = document.getElementById(searchId).value.toLowerCase().trim();
    
    // Filter data based on search term in the specified column
    const filteredData = searchTerm
        ? data.filter(row => row[columnIndex]?.toLowerCase().includes(searchTerm)) // Filter by search term
        : data; // Show all data if no search term is entered

    // Display the filtered table or show "No Location Found"
    if (filteredData.length === 0) {
        displayNoLocationFound(searchId);
    } else {
        hideNoLocationFound(searchId);
        if (searchId === 'zoneHQ-search') {
            displayTable1([zoneHQHeaders, ...filteredData]);
        } else if (searchId === 'zoneAreas-search') {
            displayTable2([zoneAreasHeaders, ...filteredData]);
        }
    }
}

// Function to display "No Location Found" message
function displayNoLocationFound(searchId) {
    const tableId = searchId === 'zoneHQ-search' ? 'data-table-1' : 'data-table-2';
    const table = document.getElementById(tableId);
    table.innerHTML = `<tr><td colspan="100%" class="no-location-found text-center">No Location Found</td></tr>`;
}

// Function to hide "No Location Found" message
function hideNoLocationFound(searchId) {
    const tableId = searchId === 'zoneHQ-search' ? 'data-table-1' : 'data-table-2';
    const table = document.getElementById(tableId);
    table.innerHTML = ''; // Clear any previous message
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
