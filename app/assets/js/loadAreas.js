// Path to your Excel file
const excelFilePath = "./data/LP48_Area_Parishes.xlsx";

// Variables to hold the original data and headers
let originalData = [];
let headers = [];

// Function to load and parse the Excel file
async function loadExcelFile() {
  try {
    const response = await fetch(excelFilePath);
    const data = await response.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      header: 1,
    }); // Convert to JSON

    // Save original data and headers
    headers = sheetData[0]; // First row as headers
    originalData = sheetData.slice(1); // Remaining rows as data

    displayTable([headers, ...originalData]); // Display the full table
  } catch (error) {
    console.error("Error loading Excel file:", error);
  }
}

// Function to filter the table based on Area input
function filterTableByArea() {
  const inputField = document.getElementById("area-input");
  const query = inputField.value.trim().toLowerCase(); // Get input value and normalize it

  // Filter by Area (assuming "Church Address" is at column index 5)
  const filteredData = query
    ? originalData.filter((row) => row[5]?.toLowerCase().includes(query)) // Check "Church Address" column (index 5)
    : originalData; // Show all data if input is empty

  // If no matching data, show "No Location Found"
  if (filteredData.length === 0) {
    displayNoLocationMessage();
  } else {
    // Re-display the table with filtered data
    displayTable([headers, ...filteredData]); // Include headers
  }
}

// Function to display "No Location Found" message
function displayNoLocationMessage() {
  const table = document.getElementById("data-table");
  table.innerHTML = ""; // Clear any existing content

  const rowElement = document.createElement("tr");
  const cellElement = document.createElement("td");
  cellElement.textContent = "No Location Found";
  cellElement.colSpan = headers.length; // Span across all columns
  cellElement.style.textAlign = "center"; // Center align the text
  rowElement.appendChild(cellElement);

  table.appendChild(rowElement);
}

// Function to display the table
function displayTable(data) {
  const table = document.getElementById("data-table");
  table.innerHTML = ""; // Clear any existing content

  data.forEach((row, rowIndex) => {
    const rowElement = document.createElement("tr");
    row.forEach((cell) => {
      const cellElement = document.createElement(rowIndex === 0 ? "th" : "td"); // Use <th> for header row
      cellElement.textContent = cell || ""; // Add cell content
      rowElement.appendChild(cellElement);
    });
    table.appendChild(rowElement);
  });
}

// Add input field event listener for Area filtering
function setupAreaInputListener() {
  const inputField = document.getElementById("area-input");
  inputField.addEventListener("input", filterTableByArea); // Filter table on every input
}

// Load the Excel file and set up the input listener on page load
window.addEventListener("DOMContentLoaded", () => {
  loadExcelFile();
  setupAreaInputListener();
});
