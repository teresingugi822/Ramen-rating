// Data stub
const ramens = [
    { id: 1, name: "Shoyu Ramen", restaurant: "Ichiran", image: "shoyu.jpg", rating: 5, comment: "Delicious!" },
    { id: 2, name: "Miso Ramen", restaurant: "Menya", image: "miso.jpg", rating: 4, comment: "Very flavorful!" },
    { id: 3, name: "Tonkotsu Ramen", restaurant: "Ramen-ya", image: "tonkotsu.jpg" }
];

// Function to display all ramens
function displayRamens() {
    const ramenMenu = document.getElementById('ramen-menu');
    ramenMenu.innerHTML = '';
    
    ramens.forEach(ramen => {
        const ramenItem = document.createElement('div');
        ramenItem.classList.add('ramen-item');
        ramenItem.dataset.id = ramen.id;
        
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        
        ramenItem.appendChild(img);
        ramenMenu.appendChild(ramenItem);
        
        // Add click event listener
        ramenItem.addEventListener('click', () => handleClick(ramen.id));
    });
}

// Function to handle click on a ramen item
function handleClick(ramenId) {
    // Clear selection class from all items
    document.querySelectorAll('.ramen-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Add selection class to clicked item
    document.querySelector(`.ramen-item[data-id="${ramenId}"]`).classList.add('selected');
    
    // Find the selected ramen
    const selectedRamen = ramens.find(ramen => ramen.id === ramenId);
    
    // Display the details
    displayRamenDetails(selectedRamen);
}

// Function to display ramen details
function displayRamenDetails(ramen) {
    const detailPanel = document.getElementById('ramen-detail');
    
    let ratingDisplay = '';
    let commentDisplay = '';
    
    if (ramen.rating) {
        ratingDisplay = `<p><span class="rating">Rating: ${ramen.rating}/5</span></p>`;
    }
    
    if (ramen.comment) {
        commentDisplay = `<p>Comment: ${ramen.comment}</p>`;
    }
    
    detailPanel.innerHTML = `
        <div class="ramen-detail-content">
            <img src="${ramen.image}" alt="${ramen.name}">
            <h3>${ramen.name}</h3>
            <p>Restaurant: ${ramen.restaurant}</p>
            ${ratingDisplay}
            ${commentDisplay}
        </div>
    `;
}

// Function to add event listener to the form
function addSubmitListener() {
    const form = document.getElementById('new-ramen-form');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const restaurant = document.getElementById('restaurant').value;
        const image = document.getElementById('image').value;
        const rating = document.getElementById('rating').value ? parseInt(document.getElementById('rating').value) : null;
        const comment = document.getElementById('comment').value;
        
        // Create new ramen object
        const newRamen = {
            id: ramens.length + 1,
            name,
            restaurant,
            image,
            rating,
            comment
        };
        
        // Add to ramens array
        ramens.push(newRamen);
        
        // Refresh display
        displayRamens();
        
        // Select the new ramen
        handleClick(newRamen.id);
        
        // Reset form
        form.reset();
    });
}

// Main function to initialize the app
function main() {
    displayRamens();
    addSubmitListener();
    
    // Display the first ramen details automatically (advanced requirement)
    if (ramens.length > 0) {
        handleClick(ramens[0].id);
    }
}

// Ensure the DOM is fully loaded before running the main function
document.addEventListener('DOMContentLoaded', main);