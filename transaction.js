// Initialize the map
// Initialize the map centered on India
var map = L.map('map').setView([20.5937, 78.9629], 5);

// Use OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

function createCustomMarker(price) {
    return L.divIcon({
        className: 'custom-icon',
        html: `<div class="price-label">${price}</div>`,
        iconSize: [40, 40]
    });
}

// Load transaction data and add to map
fetch('transactions.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(transaction => {
            const latLng = [transaction.lat, transaction.lng];
            const marker = L.marker(latLng, {
                icon: createCustomMarker(transaction.transactionAmount)
            }).addTo(map);

            marker.bindPopup(`
                <strong>Property Type:</strong> ${transaction.propertyType}<br>
                <strong>Transaction Amount:</strong> ${transaction.transactionAmount}<br>
                <strong>Date:</strong> ${transaction.date}
            `);
        });
    });


// Random sales and mortgage data
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const apartmentData = months.map(() => Math.floor(Math.random() * 1000));
const warehouseData = months.map(() => Math.floor(Math.random() * 1000));
const agriData = months.map(() => Math.floor(Math.random() * 1000));
const commercialLandData = months.map(() => Math.floor(Math.random() * 1000));
const residentialLandData = months.map(() => Math.floor(Math.random() * 1000));

const residentialLandDataset = {
    label: 'Residential Land',
    data: residentialLandData,
    borderColor: 'rgba(128, 0, 128, 1)', // Purple color
    backgroundColor: 'rgba(231, 20, 231, 0.1)', // Lighter purple color
    fill: true,
};


const apartmentDataset = {
    label: 'Apartment',
    data: apartmentData,
    borderColor: 'rgba(75, 192, 192, 1)',
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    fill: true,
};

const warehouseDataset = {
    label: 'Warehouse',
    data: warehouseData,
    borderColor: 'rgba(255, 159, 64, 1)',
    backgroundColor: 'rgba(255, 159, 64, 0.2)',
    fill: true,
};

const agriDataset = {
    label: 'Agricultural',
    data: agriData,
    borderColor: 'rgba(255, 0, 0, 1)',
    backgroundColor: 'rgba(255, 0, 0, 0.1)', // Lighter red color
    fill: true,
};

const commercialLandDataset = {
    label: 'Commercial Land',
    data: commercialLandData,
    borderColor: 'rgba(0, 0, 255, 1)',
    backgroundColor: 'rgba(0, 0, 255, 0.1)', // Lighter blue color
    fill: true,
};


const ctx = document.getElementById('salesGraph').getContext('2d');
const salesChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: months,
        datasets: [apartmentDataset, warehouseDataset, agriDataset, commercialLandDataset, residentialLandDataset],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});

function updateGraph(type) {
    if (type === 'Apartment') {
        salesChart.data.datasets = [apartmentDataset];
    } else if (type === 'Warehouse') {
        salesChart.data.datasets = [warehouseDataset];
    } else if (type === 'Agricultural') {
        salesChart.data.datasets = [agriDataset];
    } else if (type === 'CommercialLand') {
        salesChart.data.datasets = [commercialLandDataset];
    } else if (type === 'residentialLandData') {
        salesChart.data.datasets = [residentialLandDataset];
    } else { // both
        salesChart.data.datasets = [apartmentDataset, warehouseDataset, agriDataset, commercialLandDataset, residentialLandDataset];
    }

    salesChart.update();

    // Handle button active state
    // First, remove the active class from all buttons
    document.querySelectorAll('.btn-group button').forEach(btn => {
        btn.classList.remove('active');
    });

    // Then, add the active class to the clicked button
    const activeButton = document.querySelector(`.btn-group button[data-type="${type}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// Call the function to set the default view
updateGraph('Apartment');



// For illustration, let's add random values to the stats blocks
document.getElementById('totalTransactions').textContent = Math.floor(Math.random() * 500);
document.getElementById('totalWorth').textContent = (Math.random() * 1000000).toFixed(2);
document.getElementById('totalUnits').textContent = Math.floor(Math.random() * 500);
document.getElementById('totalBuildings').textContent = Math.floor(Math.random() * 300);
document.getElementById('totalLands').textContent = Math.floor(Math.random() * 200);


// Set default date to today
document.addEventListener('DOMContentLoaded', (event) => {
    const today = new Date().toISOString().split('T')[0];
    const datePicker = document.getElementById('datePicker');
    datePicker.value = today;
    updateDateDisplay();
});

// Function to update the date display
// Function to update the date display
function updateDateDisplay() {
    const datePicker = document.getElementById('datePicker');
    const selectedDateDisplay = document.getElementById('selectedDate');

    // Parse the selected date and format it as "dd mm yyyy"
    const selectedDate = new Date(datePicker.value);

    if (!isNaN(selectedDate.getDate())) {
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const year = selectedDate.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;

        selectedDateDisplay.textContent = "Date: " + formattedDate;
    } else {
        selectedDateDisplay.textContent = "Invalid Date";
    }
}

// Function to check screen size and display alert
var hasAlertBeenShown = false;

function checkScreenSize() {
    if (window.innerWidth <= 768 && !hasAlertBeenShown) {
        alert("For a better experience, we recommend using the site in landscape mode on your mobile device.");
        hasAlertBeenShown = true;
    }
}

// Check screen size on page load
checkScreenSize();

// Attach the function to the window resize event
window.addEventListener('resize', checkScreenSize);
