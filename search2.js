function searchPage(){
    // Assuming you have a function to fetch data asynchronously
    async function fetchMedicineData() {

        try {

            const response = await fetch('meds4.json');
            const data = await response.json();
            return data;
            // const response = await fetch('meds.json');
            // const data = await response.json();
            // const part =  data.slice(0,50000);
            // return part;


        } catch (error) {
            console.error('Error fetching medicine data:', error);
            return [];
        }

    }

    const cardContainer = document.getElementById('cardContainer');
    const searchInput = document.getElementById('medicineSearch');

async function displayMedicineCards(searchTerm) {
        const medicineData = await fetchMedicineData();

        const searchResults = medicineData.filter(medicine =>
            medicine.name.toLowerCase().includes(searchTerm) 
            // ||
            // medicine.composition.toLowerCase().includes(searchTerm)
        );

        cardContainer.innerHTML = '';
        searchResults.forEach(medicine => {
        // const card = document.createElement('div'); // Changed from 'a' to 'div'
        // card.classList.add('card');
        // card.classList.add('a');
        // card.style.marginTop = '2.2rem';
        // card.dataset.id = medicine.id; // Assuming each medicine has a unique 'id' field

    const card = document.createElement('div');
    
            card.classList.add('remedies-container');
            card.dataset.id = medicine.id;

            card.innerHTML = `
                <div class="remedie">
                            <div class="text-remedie">
                                <h4>${medicine.name}</h4>
                                <p>${medicine.use}</p>
                            </div>
                </div>


    `;

    cardContainer.appendChild(card);

    // cardContainer.appendChild(card);
});

// ... your previous JavaScript code ...

const cards = document.getElementsByClassName('remedies-container');

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function(event) {
        // Get the medicine ID directly from the clicked element's dataset
        const medicineId = this.dataset.id;
        console.log(medicineId);

        const medicineDetail = medicineData.find(medicine => medicine.id === parseInt(medicineId));

// if (!medicineDetail) {
//     console.error('No medicine found with ID:', medicineId);
//     return; // Exit the function or handle the error appropriately
// }

        if (medicineDetail) {
            displayModal(medicineDetail);
            console.log("Data " + medicineDetail);
        }
    });
}


function displayModal(medicine) {
    const modalContent = `
        <div class="modal">
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <h2 class="modal-title">${medicine.name}</h2>
                <p><strong>Substitute:</strong> ${medicine.substitute}</p>
                <p><strong>SideEffect:</strong> ${medicine.sideEffect}</p>
                <p><strong>Use:</strong> ${medicine.use}</p>
            </div>
        </div>
    `;

    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalContent;
    document.body.appendChild(modalContainer);

    // Close modal when close button is clicked
    const closeButton = modalContainer.querySelector('.close-btn');
    closeButton.addEventListener('click', function() {
        document.body.removeChild(modalContainer); // Remove modal from DOM
    });
}

}

    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();
        displayMedicineCards(searchTerm);
    });

    // Initial display when the page loads
    displayMedicineCards('');
}

