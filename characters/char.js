const btn1 = document.getElementById('btn1')
const aDU = document.querySelector('.dppp1')
const dos1 = document.querySelector('.dos1')
const ali = document.getElementById('Ali')
const dea = document.getElementById('Dea')
const unk = document.getElementById('Unk')
const palive = document.getElementById('alive')

let adu1 = 'Alive'
let opened = false;
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
        opened = false
    }
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
}, 10   );