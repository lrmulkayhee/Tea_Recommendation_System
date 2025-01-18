document.addEventListener('DOMContentLoaded', () => {
    fetchTeaData();
});

async function fetchTeaData() {
    const response = await fetch('/teas');
    const teas = await response.json();

    document.getElementById('total-teas').textContent = teas.length;

    const plants = [...new Set(teas.map(tea => tea.Plant))];
    const types = [...new Set(teas.map(tea => tea.Type))];
    const regions = [...new Set(teas.map(tea => tea.region))];

    populateDropdown('filter-plant', plants);
    populateDropdown('filter-type', types);
    populateDropdown('filter-region', regions);
}

function populateDropdown(elementId, options) {
    const dropdown = document.getElementById(elementId);
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        dropdown.appendChild(opt);
    });
}

async function filterTeas() {
    const plant = document.getElementById('filter-plant').value;
    const type = document.getElementById('filter-type').value;
    const region = document.getElementById('filter-region').value;

    const response = await fetch('/teas');
    const teas = await response.json();

    let filteredTeas = teas;

    if (plant) {
        filteredTeas = filteredTeas.filter(tea => tea.Plant === plant);
    }

    if (type) {
        filteredTeas = filteredTeas.filter(tea => tea.Type === type);
    }

    if (region) {
        filteredTeas = filteredTeas.filter(tea => tea.region === region);
    }

    displayRecommendations(filteredTeas);
    displayTeaChart(filteredTeas);
}

function displayRecommendations(teas) {
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = '';

    if (teas.length > 0) {
        teas.forEach(tea => {
            const teaDiv = document.createElement('div');
            teaDiv.classList.add('card', 'mb-3');
            teaDiv.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${tea.name}</h5>
                    <p class="card-text">${tea.description}</p>
                    <p class="card-text"><small class="text-muted">Origin: ${tea.origin}</small></p>
                </div>
            `;
            recommendationsDiv.appendChild(teaDiv);
        });
    } else {
        recommendationsDiv.innerHTML = '<p>No teas found.</p>';
    }
}

function displayTeaChart(teas) {
    const ctx = document.getElementById('teaChart').getContext('2d');
    const labels = teas.map(tea => tea.name);
    const caffeineContent = teas.map(tea => parseInt(tea['Caffeine Content (per 8oz cup)']) || 0);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Caffeine Content (mg)',
                data: caffeineContent,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}