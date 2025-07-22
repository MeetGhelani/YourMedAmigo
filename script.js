// function remedies(){
//     // Declare remediesData as a global variable
//     let remediesData = [];

//     async function fetchRemedies() {
//         try {
//             const response = await fetch('remedies.json');
//             const data = await response.json();
//             remediesData = data.home_remedies || [];
//             return remediesData;
//         } catch (error) {
//             console.error('Error fetching remedies data:', error);
//             return [];
//         }
//     }
    
//     const cardContainer = document.getElementById('conti');
//     const searchInput = document.getElementById('medicineSearch');
    
//     async function displayRemedieCards(searchTerm) {
//         const remediesData = await fetchRemedies();
    
//         const searchResults = remediesData.filter(remedie =>
//             remedie.home_remedie_title.toLowerCase().includes(searchTerm)
//         );
    
//         cardContainer.innerHTML = ''; // Clear existing cards
    
//         searchResults.forEach(remedie => {
//             const card = document.createElement('div');
//             card.classList.add('remedies-container');
//             card.dataset.id = remedie.id;
    
//             card.innerHTML = `
//                 <div class="remedie">
//                     <div class="remedie-img">
//                         <img src="${remedie.img}" alt="" />
//                     </div>
//                     <div class="text-remedie">
//                         <h4>${remedie.home_remedie_title}</h4>
//                         <p>${remedie.home_remedie_solution}</p>
//                     </div>
//                 </div>
//             `;
    
//             card.addEventListener('click', () => openInfoTab(remedie.id)); // Open infoTab on card click
    
//             cardContainer.appendChild(card);
//         });
//     }
    
//     // Add an event listener to the search input for real-time searching
//     searchInput.addEventListener('input', function () {
//         displayRemedieCards(this.value.toLowerCase());
//     });
    
//     // InfoTab functions
//     function openInfoTab(id) {
//         const remedie = getRemedieById(id);
//         if (remedie) {
//             document.getElementById('infoTabImage').src = remedie.img;
//             document.getElementById('infoTabTitle').innerText = remedie.home_remedie_title;
//             document.getElementById('infoTabSolution').innerText = remedie.home_remedie_solution;
//             document.getElementById('remedieInfoTab').style.display = 'block';
//         }
//     }
    
//     function closeInfoTab() {
//         document.getElementById('remedieInfoTab').style.display = 'none';
//     }
    
//     function getRemedieById(id) {
//         return remediesData.find(remedie => remedie.id === id);
//     }

//     document.getElementById("close").addEventListener("click", function(){
//         closeInfoTab();
//     })
    
//     // Initial display when the page loads
//     displayRemedieCards('');

    
// }


function list(){
    document.head.innerHTML += '<link rel="stylesheet" href="./list.css">';
}


const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab => {
  if (tab.classList.contains("active")) {
    tab.classList.remove("active");
  }

  tab.addEventListener("click", () => {
    tabs.forEach(otherTab => otherTab.classList.remove("active"));
    tab.classList.add("active");
  });
});



function finalremedies(){
    async function fetchRemedies() {
        try {
            const response = await fetch('remediesfinal.json');
            const data = await response.json();
            console.log('Fetched remedies data:', data); // Log the fetched data
            return data || [];
        } catch (error) {
            console.error('Error fetching remedies data:', error);
            return [];
        }
    }
    
    let home_remedies = []; // Define home_remedies variable outside
const cardContainer = document.getElementById('conti');
const searchInput = document.getElementById('medicineSearch');

async function displayRemedieCards(searchTerm) {
    try {
        const data = await fetchRemedies();
        home_remedies = data.home_remedies; // Destructure the fetched data

        // Ensure home_remedies is an array before proceeding
        if (!Array.isArray(home_remedies)) {
            console.error('Remedies data is not an array:', home_remedies);
            return;
        }

        const searchResults = home_remedies.filter(remedie =>
            remedie.Health_Issue.toLowerCase().includes(searchTerm)
        );

        cardContainer.innerHTML = ''; // Clear existing cards

        searchResults.forEach(remedie => {
            const card = document.createElement('div');
            card.classList.add('remedies-container');
            card.dataset.id = remedie.id;

            card.innerHTML = `
                <div class="remedie">
                    <div class="text-remedie">
                        <h4>${remedie.Health_Issue}</h4>
                        <p>${remedie.Home_Remedy}</p>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => openInfoTab(remedie.id)); // Open infoTab on card click

            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error displaying remedies:', error);
    }
}


// Add an event listener to the search input for real-time searching
searchInput.addEventListener('input', function () {
    displayRemedieCards(this.value.toLowerCase());
});

// InfoTab functions
function openInfoTab(id) {
    const remedie = getRemedieById(id);
    if (remedie) {
        document.getElementById('infoTabTitle').innerText = remedie.Health_Issue;
        document.getElementById('infoTabSolution').innerText = remedie.Home_Remedy;
        document.getElementById('remedieInfoTab').style.display = 'block';
    }
}

function closeInfoTab() {
    document.getElementById('remedieInfoTab').style.display = 'none';
}

function getRemedieById(id) {
    const remedie = home_remedies.find(remedie => remedie.id === parseInt(id));
    return remedie || null;
}

document.getElementById("close").addEventListener("click", function(){
    closeInfoTab();
});


// Initial display when the page loads
displayRemedieCards('');

}

