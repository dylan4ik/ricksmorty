const btn1 = document.getElementById('btn1')
const aDU = document.querySelector('.dppp1')
const dos1 = document.querySelector('.dos1')
const ali = document.getElementById('Ali')
const dea = document.getElementById('Dea')
const unk = document.getElementById('Unk')
const palive = document.getElementById('alive')
const chrts1 = document.getElementById('chrts1')
const loadMoreBtn = document.querySelector('#lmbtn');

// Species filter
const btn2 = document.getElementById('btn2')
const dppp2 = document.getElementById('species-dropdown')
const speciesLabel = document.getElementById('species-label')

// Type filter
const btn3 = document.getElementById('btn3')
const dppp3 = document.getElementById('type-dropdown')
const typeLabel = document.getElementById('type-label')

// Gender filter
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
    <img src="{{imgsrc}}" alt="sry" class="imgsrc">
    <P class="p1bo">{{p1bo}}</P>
    <p class="p2gr">Origin</p><p class="p2bl">{{p2bl}}</p>
    <p class="p3gr">Location</p><p class="p3bl">{{p3bl}}</p>
</li>`;

function renderCharacters(characters) {
    chrts1.innerHTML = ''
    const template = Handlebars.compile(template1)
    
    characters.forEach(character => {
        const html = template({
            imgsrc: character.image,
            p1bo: character.name,
            p2bl: character.origin.name,
            p3bl: character.location.name
        })
        chrts1.innerHTML += html
    })
}

function applyFilters() {
    const filtered = filterCharacters()
    renderCharacters(filtered)
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

// Species filter
btn2.addEventListener('click', () => {
    dppp2.classList.toggle('invis')
})

document.querySelectorAll('.species-opt').forEach(option => {
    option.addEventListener('click', () => {
        currentSpecies = option.dataset.value
        speciesLabel.textContent = currentSpecies
        dppp2.classList.add('invis')
        applyFilters()
    })
})

// Type filter
btn3.addEventListener('click', () => {
    dppp3.classList.toggle('invis')
})

document.querySelectorAll('.type-opt').forEach(option => {
    option.addEventListener('click', () => {
        currentType = option.dataset.value
        typeLabel.textContent = currentType
        dppp3.classList.add('invis')
        applyFilters()
    })
})

// Gender filter
btn4.addEventListener('click', () => {
    dppp4.classList.toggle('invis')
})

document.querySelectorAll('.gender-opt').forEach(option => {
    option.addEventListener('click', () => {
        currentGender = option.dataset.value
        genderLabel.textContent = currentGender
        dppp4.classList.add('invis')
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