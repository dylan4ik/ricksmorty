const API_URL = 'https://rickandmortyapi.com/api/episode';
const episodesList = document.getElementById('episodesList');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');
const seasonBtn = document.getElementById('seasonBtn');
const seasonDropdown = document.getElementById('seasonDropdown');
const seasonLabel = document.getElementById('seasonLabel');
const episodeModal = document.getElementById('episodeModal');
const closeModal = document.getElementById('closeModal');
const modalBody = document.getElementById('modalBody');

let allEpisodes = [];
let filteredEpisodes = [];
let currentPage = 1;
let totalPages = 1;
let currentSeason = 'all';
let searchQuery = '';
let seasonOpened = false;

const episodeTemplate = `
<li class="episode-card">
    <div class="episode-card-content">
        <div class="episode-code">{{code}}</div>
        <h3 class="episode-name">{{name}}</h3>
        <div class="episode-info">Episode {{episode}}</div>
        <div class="episode-date">Aired: {{air_date}}</div>
    </div>
</li>
`;

const modalTemplate = `
<div class="modal-info">
    <h2>{{name}}</h2>
    <div class="info-row">
        <span class="info-label">Episode Code</span>
        <span class="info-value">{{code}}</span>
    </div>
    <div class="info-row">
        <span class="info-label">Air Date</span>
        <span class="info-value">{{air_date}}</span>
    </div>
    <div class="info-row">
        <span class="info-label">Season</span>
        <span class="info-value">{{season}}</span>
    </div>
    <div class="info-row">
        <span class="info-label">Episode Number</span>
        <span class="info-value">{{episode}}</span>
    </div>
</div>
`;

async function fetchEpisodes(page = 1) {
    try {
        loadingSpinner.classList.remove('invis');
        noResults.classList.add('invis');
        
        const response = await fetch(`${API_URL}?page=${page}`);
        const data = await response.json();
        
        if (data.results) {
            allEpisodes = [...allEpisodes, ...data.results];
            totalPages = data.info.pages;
            
            // Filter and display episodes
            filterAndDisplayEpisodes();
        }
        
        loadingSpinner.classList.add('invis');
    } catch (error) {
        console.error('Error fetching episodes:', error);
        showNoResults();
    }
}

function getSeasonNumber(episodeCode) {
    const match = episodeCode.match(/S(\d+)/);
    return match ? match[1] : '0';
}

function filterAndDisplayEpisodes() {
    filteredEpisodes = allEpisodes.filter(episode => {
        const season = getSeasonNumber(episode.episode);
        const matchesSeason = currentSeason === 'all' || season === currentSeason;
        const matchesSearch = episode.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesSeason && matchesSearch;
    });
    
    if (filteredEpisodes.length === 0) {
        showNoResults();
    } else {
        renderEpisodes(filteredEpisodes);
        loadMoreBtn.classList.toggle('invis', currentPage >= totalPages);
    }
}

function renderEpisodes(episodes) {
    episodesList.innerHTML = '';
    
    const template = Handlebars.compile(episodeTemplate);
    
    episodes.forEach(episode => {
        const html = template({
            code: episode.episode,
            name: episode.name,
            episode: episode.episode.split('E')[1],
            air_date: episode.air_date
        });
        
        episodesList.innerHTML += html;
    });
    
    noResults.classList.add('invis');
    
    document.querySelectorAll('.episode-card').forEach((card) => {
        card.addEventListener('click', () => {
            openEpisodeModal(episodes.find(ep => ep.episode === card.querySelector('.episode-code').textContent));
        });
    });
}

function showNoResults() {
    episodesList.innerHTML = '';
    noResults.classList.remove('invis');
    loadMoreBtn.classList.add('invis');
}

function openEpisodeModal(episode) {
    const template = Handlebars.compile(modalTemplate);
    const seasonNum = episode.episode.match(/S(\d+)/)[1];
    
    modalBody.innerHTML = template({
        code: episode.episode,
        name: episode.name,
        air_date: episode.air_date,
        season: seasonNum,
        episode: episode.episode.split('E')[1]
    });
    
    episodeModal.classList.remove('invis');
}

seasonBtn.addEventListener('click', () => {
    if (!seasonOpened) {
        seasonDropdown.classList.remove('invis', 'cls');
        seasonDropdown.classList.add('opn');
        seasonOpened = true;
    } else {
        seasonDropdown.classList.remove('opn');
        seasonDropdown.classList.add('cls');
        setTimeout(() => {
            seasonDropdown.classList.add('invis');
        }, 490);
        seasonOpened = false;
    }
});

document.querySelectorAll('#seasonDropdown .filter-opt').forEach((option, index) => {
    option.addEventListener('click', (e) => {
        const seasons = ['all', '1', '2', '3', '4', '5', '6'];
        currentSeason = seasons[index];
        seasonLabel.textContent = e.target.textContent;
        
        seasonDropdown.classList.remove('opn');
        seasonDropdown.classList.add('cls');
        setTimeout(() => {
            seasonDropdown.classList.add('invis');
        }, 490);
        seasonOpened = false;
        
        currentPage = 1;
        allEpisodes = [];
        fetchEpisodes(1);
    });
});

searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    filterAndDisplayEpisodes();
});

loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    if (currentPage <= totalPages) {
        fetchEpisodes(currentPage);
    }
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.filter-group') && seasonOpened) {
        seasonDropdown.classList.remove('opn');
        seasonDropdown.classList.add('cls');
        setTimeout(() => {
            seasonDropdown.classList.add('invis');
        }, 490);
        seasonOpened = false;
    }
});

closeModal.addEventListener('click', () => {
    episodeModal.classList.add('invis');
});

episodeModal.addEventListener('click', (event) => {
    if (event.target === episodeModal) {
        episodeModal.classList.add('invis');
    }
});

fetchEpisodes(1);
