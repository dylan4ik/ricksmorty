const btn1 = document.getElementById('btn1')
const aDU = document.querySelector('.dppp1')
const dos1 = document.querySelector('.dos1')
const ali = document.getElementById('Ali')
const dea = document.getElementById('Dea')
const unk = document.getElementById('Unk')
const palive = document.getElementById('alive')
const chrts1 = document.getElementById('chrts1')
const loadMoreBtn = document.querySelector('#lmbtn');
const modal = document.getElementById('character-modal')
const closeModal = document.getElementById('close-modal')
const modalImage = document.getElementById('modal-image')
const episodesList = document.getElementById('episodes-list')
const btn2 = document.getElementById('btn2')
const dppp2 = document.getElementById('species-dropdown')
const speciesLabel = document.getElementById('species-label')
const btn3 = document.getElementById('btn3')
const dppp3 = document.getElementById('type-dropdown')
const typeLabel = document.getElementById('type-label')
const btn4 = document.getElementById('btn4')
const dppp4 = document.getElementById('gender-dropdown')
const genderLabel = document.getElementById('gender-label')

let adu1 = 'Alive'
let currentSpecies = 'All'
let currentType = 'All'
let currentGender = 'All'
let opened = false;
let currentPage = 1;
let allCharacters = [];

function filterCharacters() {
    return allCharacters.filter(char => {
        const statusMatch = char.status === adu1
        const speciesMatch = currentSpecies === 'All' || char.species === currentSpecies
        const typeMatch = currentType === 'All' || char.type === currentType
        const genderMatch = currentGender === 'All' || char.gender === currentGender

        return statusMatch && speciesMatch && typeMatch && genderMatch
    })
}

const template1 = `<li class="li1">
    <img src="{{imgsrc}}" alt="sry" class="imgsrc" data-character-id="{{id}}">
    <P class="p1bo">{{p1bo}}</P>
    <p class="p2gr">Origin</p><p class="p2bl">{{p2bl}}</p>
    <p class="p3gr">Location</p><p class="p3bl">{{p3bl}}</p>
</li>`;

function renderCharacters(characters) {
    chrts1.innerHTML = ''
    const noResults = document.getElementById('no-results')

    if (characters.length === 0) {
        noResults.classList.remove('invis')
        return
    }

    noResults.classList.add('invis')
    const template = Handlebars.compile(template1)

    characters.forEach(character => {
        const html = template({
            imgsrc: character.image,
            p1bo: character.name,
            p2bl: character.origin.name,
            p3bl: character.location.name,
            id: character.id
        })
        chrts1.innerHTML += html
    })
    document.querySelectorAll('.imgsrc').forEach(img => {
        img.addEventListener('click', () => {
            const characterId = img.dataset.characterId
            const character = allCharacters.find(char => char.id == characterId)
            if (character) {
                showCharacterModal(character)
            }
        })
    })
}

function applyFilters() {
    const filtered = filterCharacters()
    renderCharacters(filtered)
}

async function showCharacterModal(character) {

    document.getElementById('modal-image').src = character.image
    
    const modalInfo = document.querySelector('.modal-info')
    modalInfo.innerHTML = `
        <div class="info-row">
            <div class="info-label">Status</div>
            <div class="info-value">${character.status}</div>
        </div>
        <div class="info-row">
            <div class="info-label">Species</div>
            <div class="info-value">${character.species}</div>
        </div>
        <div class="info-row">
            <div class="info-label">Gender</div>
            <div class="info-value">${character.gender}</div>
        </div>
        <div class="info-row">
            <div class="info-label">Origin</div>
            <div class="info-value">${character.origin.name}</div>
        </div>
        <div class="info-row">
            <div class="info-label">Location</div>
            <div class="info-value">${character.location.name}</div>
        </div>
        <div class="info-row">
            <div class="info-label">Type</div>
            <div class="info-value">${character.type || 'N/A'}</div>
        </div>
    `

    episodesList.innerHTML = '<li>Loading episodes...</li>'
    try {
        const episodePromises = character.episode.map(url => fetch(url).then(res => res.json()))
        const episodes = await Promise.all(episodePromises)

        episodesList.innerHTML = ''
        episodes.forEach(episode => {
            const episodeItem = document.createElement('li')
            episodeItem.classList.add('episode-item')
            episodeItem.innerHTML = `
                <div class="episode-box">
                <div styles="display: flex; flex-direction: row; align-items: center;">
                    <p class="episode-name"><strong>${episode.name}</strong></p>
                    </div>
                    <div class="episode-info">
                        <div>
                        <p class="episode-label">Season <span class="episode-value">${episode.season}</span></p>
                        </div>
                        <div>
                        <p class="episode-label">Air date <span class="episode-value">${episode.air_date}</span></p>
                        </div>
                    </div>
                </div>`
            episodesList.appendChild(episodeItem)
        })
    } catch (error) {
        console.error('Error loading episodes:', error)
        episodesList.innerHTML = '<li>Error loading episodes</li>'
    }

    modal.classList.remove('invis')
}

async function loadCharacters(page = 1) {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
        const dat = await response.json()

        allCharacters = [...allCharacters, ...dat.results]

        applyFilters()

        currentPage = page

        if (!dat.info.next) {
            loadMoreBtn.style.display = 'none'
        }
    } catch (error) {
        console.error('Error loading characters:', error)
    }
}

loadCharacters()

loadMoreBtn.addEventListener('click', () => {
    loadCharacters(currentPage + 1)
})

closeModal.addEventListener('click', () => {
    modal.classList.add('invis')
})

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.add('invis')
    }
})
btn1.addEventListener('click', () => {

    aDU.classList.remove('invis')
    aDU.classList.add('opn')
    setTimeout(() => {
        aDU.classList.remove('opn')
    }, 500);
})

btn1.addEventListener('click', () => {
    if (!opened) {
        aDU.classList.remove('invis', 'cls')
        aDU.classList.add('opn')
        opened = true
    } else {
        aDU.classList.remove('opn')
        aDU.classList.add('cls')
        setTimeout(() => {
            aDU.classList.add('invis')
        }, 490);
        opened = false
    }
})
ali.addEventListener('click', () => {
    if (!opened) {
        aDU.classList.remove('invis', 'cls')
        aDU.classList.add('opn')
        opened = true
    } else {
        aDU.classList.remove('opn')
        aDU.classList.add('cls')
        setTimeout(() => {
            aDU.classList.add('invis')
        }, 490);
        palive.textContent = 'Alive'
        adu1 = 'Alive'
        applyFilters()
        opened = false
    }
})
dea.addEventListener('click', () => {
    if (!opened) {
        aDU.classList.remove('invis', 'cls')
        aDU.classList.add('opn')
        opened = true
    } else {
        aDU.classList.remove('opn')
        aDU.classList.add('cls')
        setTimeout(() => {
            aDU.classList.add('invis')
        }, 490);
        palive.textContent = 'Dead'
        adu1 = 'Dead'
        applyFilters()
        opened = false
    }
})
unk.addEventListener('click', () => {
    if (!opened) {
        aDU.classList.remove('invis', 'cls')
        aDU.classList.add('opn')
        opened = true
    } else {
        aDU.classList.remove('opn')
        aDU.classList.add('cls')
        setTimeout(() => {
            aDU.classList.add('invis')
        }, 490);
        palive.textContent = 'Unknown'
        adu1 = 'Unknown'
        applyFilters()
        opened = false
    }
})

btn2.addEventListener('click', () => {
    if (dppp2.classList.contains('invis')) {
        dppp2.classList.remove('invis', 'cls')
        dppp2.classList.add('opn')
    } else {
        dppp2.classList.remove('opn')
        dppp2.classList.add('cls')
        setTimeout(() => {
            dppp2.classList.add('invis')
        }, 490)
    }
})

document.querySelectorAll('.species-opt').forEach(option => {
    option.addEventListener('click', () => {
        currentSpecies = option.dataset.value
        speciesLabel.textContent = currentSpecies
        dppp2.classList.remove('opn')
        dppp2.classList.add('cls')
        setTimeout(() => {
            dppp2.classList.add('invis')
        }, 490)
        applyFilters()
    })
})

btn3.addEventListener('click', () => {
    if (dppp3.classList.contains('invis')) {
        dppp3.classList.remove('invis', 'cls')
        dppp3.classList.add('opn')
    } else {
        dppp3.classList.remove('opn')
        dppp3.classList.add('cls')
        setTimeout(() => {
            dppp3.classList.add('invis')
        }, 490)
    }
})

document.querySelectorAll('.type-opt').forEach(option => {
    option.addEventListener('click', () => {
        currentType = option.dataset.value
        typeLabel.textContent = currentType
        dppp3.classList.remove('opn')
        dppp3.classList.add('cls')
        setTimeout(() => {
            dppp3.classList.add('invis')
        }, 490)
        applyFilters()
    })
})

btn4.addEventListener('click', () => {
    if (dppp4.classList.contains('invis')) {
        dppp4.classList.remove('invis', 'cls')
        dppp4.classList.add('opn')
    } else {
        dppp4.classList.remove('opn')
        dppp4.classList.add('cls')
        setTimeout(() => {
            dppp4.classList.add('invis')
        }, 490)
    }
})

document.querySelectorAll('.gender-opt').forEach(option => {
    option.addEventListener('click', () => {
        currentGender = option.dataset.value
        genderLabel.textContent = currentGender
        dppp4.classList.remove('opn')
        dppp4.classList.add('cls')
        setTimeout(() => {
            dppp4.classList.add('invis')
        }, 490)
        applyFilters()
    })
})

setInterval(() => {
    switch (adu1) {
        case 'Alive':
            break;
        case 'Dead':
            break;
        case 'Unknown':
            break;
        default:

    }
}, 10);




// const template = Handlebars.compile(templateString);

// const data = {
//     imgsrc: '',
//     p1bo: 'Rick Sanchez',
//     p2bl: 'Unknown',
//     p3bl: 'Earth C-137'
// };

// const html = template(data);
// document.querySelector('ul').innerHTML += html;