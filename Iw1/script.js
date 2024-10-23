const gates = document.querySelectorAll('.gate');
const terminals = document.querySelectorAll('.terminal');
const tooltip = document.getElementById('tooltip');
const modal = document.getElementById('infoModal');
const overlay = document.getElementById('overlay');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalImage = document.getElementById('modalImage');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// Sample Data for Gates and Terminals
const infoData = {
    "Gate A1": {
        description: "Gate A1 is for international flights.",
        image: "https://via.placeholder.com/300?text=Gate+A1"
    },
    "Gate A2": {
        description: "Gate A2 handles domestic flights.",
        image: "https://via.placeholder.com/300?text=Gate+A2"
    },
    "Gate A3": {
        description: "Gate A3 is for cargo planes.",
        image: "https://via.placeholder.com/300?text=Gate+A3"
    },
    "Gate B1": {
        description: "Gate B1 is reserved for VIP travelers.",
        image: "https://via.placeholder.com/300?text=Gate+B1"
    },
    "Gate B2": {
        description: "Gate B2 handles charter flights.",
        image: "https://via.placeholder.com/300?text=Gate+B2"
    },
    "Gate B3": {
        description: "Gate B3 is for special cargo.",
        image: "https://via.placeholder.com/300?text=Gate+B3"
    },
    "Terminal 1": {
        description: "Terminal 1 serves budget airlines.",
        image: "https://via.placeholder.com/300?text=Terminal+1"
    },
    "Terminal 2": {
        description: "Terminal 2 serves premium airlines.",
        image: "https://via.placeholder.com/300?text=Terminal+2"
    }
};

// Tooltip Hover Effect
function showTooltip(e) {
    const name = e.target.getAttribute('data-name');
    if (name) {
        tooltip.textContent = name;
        tooltip.style.left = e.pageX + 10 + 'px';
        tooltip.style.top = e.pageY - 20 + 'px';
        tooltip.style.display = 'block';
    }
}

function hideTooltip() {
    tooltip.style.display = 'none';
}

// Show Modal with Info
function showInfo(e) {
    const name = e.target.getAttribute('data-name');
    const info = infoData[name] || { description: "No information available.", image: "" };

    modalTitle.textContent = name;
    modalDescription.textContent = info.description;
    modalImage.src = info.image || "https://via.placeholder.com/300?text=No+Image";

    modal.style.display = 'block';
    overlay.style.display = 'block';
}

// Close Modal
function closeModal() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
}

// Search Functionality
searchButton.addEventListener('click', function() {
    const query = searchInput.value.toLowerCase();
    let found = false;

    // Search through gates and terminals
    gates.forEach(gate => {
        if (gate.getAttribute('data-name').toLowerCase().includes(query)) {
            showInfo({ target: gate });
            found = true;
        }
    });

    terminals.forEach(terminal => {
        if (terminal.getAttribute('data-name').toLowerCase().includes(query)) {
            showInfo({ target: terminal });
            found = true;
        }
    });

    if (!found) {
        alert("No matching gate or terminal found.");
    }
});

// Attach Event Listeners to Gates and Terminals
gates.forEach(gate => {
    gate.addEventListener('mouseenter', showTooltip);
    gate.addEventListener('mouseleave', hideTooltip);
    gate.addEventListener('click', showInfo);
});

terminals.forEach(terminal => {
    terminal.addEventListener('mouseenter', showTooltip);
    terminal.addEventListener('mouseleave', hideTooltip);
    terminal.addEventListener('click', showInfo);
});

// Close modal when overlay is clicked
overlay.addEventListener('click', closeModal);
const searchResult = document.getElementById('searchResult'); // Grab the result message element

// Search Functionality
searchButton.addEventListener('click', function() {
    const query = searchInput.value.toLowerCase().trim();
    let found = false;

    // Reset search result message
    searchResult.style.display = 'none';
    searchResult.classList.remove('success');
    searchResult.textContent = '';

    if (query === '') {
        alert('Please enter a gate or terminal name.');
        return;
    }

    // Search through gates and terminals
    gates.forEach(gate => {
        if (gate.getAttribute('data-name').toLowerCase().includes(query)) {
            showInfo({ target: gate });
            found = true;
        }
    });

    terminals.forEach(terminal => {
        if (terminal.getAttribute('data-name').toLowerCase().includes(query)) {
            showInfo({ target: terminal });
            found = true;
        }
    });

    // Show result message
    if (!found) {
        searchResult.textContent = "No matching gate or terminal found.";
        searchResult.style.display = 'block';
    } else {
        searchResult.textContent = `Found: ${query}`;
        searchResult.classList.add('success');
        searchResult.style.display = 'block';
    }
});

