let pointsDiv = document.querySelector('.pointsSection-points'),
    questionColor = document.querySelector('.playSection-question-color'),
    options = document.getElementsByClassName('playSection-options-colorOption'),
    resetBtn = document.querySelector('.controlSection-resetBtn'),
    nextQuestionBtn = document.querySelector('.controlSection-nextQuestionBtn');

let points = 0;
let color = '';
let hasChosen = true;

const init = () => {
    pointsDiv.textContent = '0';
    points = 0;
    
    Object.entries(options)
            .forEach(([key, value]) => {
                value.textContent = '';
                value.addEventListener('click', (e) => {validateOption(e)});
            })
    hasChosen = true;
    startRound();
}

const startRound = () => {
    if(!hasChosen){return;}
    hasChosen = false;
    Object.values(options)
            .forEach((value) => { value.style['background-color'] = '#7B435B';})

    color = '#' + Math.floor(Math.random()*16777215)
                            .toString(16)
                            .toUpperCase();

    let bait1 = '#' + Math.floor(Math.random()*16777215)
                            .toString(16)
                            .toUpperCase();
    
    let bait2 = '#' + Math.floor(Math.random()*16777215)
                            .toString(16)
                            .toUpperCase();

    questionColor.style['background-color'] = color;
    let sortedOptions = Object.values(options).sort(() => Math.random() - 0.5);
    sortedOptions[0].textContent = color;
    sortedOptions[1].textContent = bait1;
    sortedOptions[2].textContent = bait2;
}

const validateOption = (e) => {
    if(hasChosen){return;}
    const btn = e.target;
    e.stopPropagation();
    e.preventDefault();
    if(btn.textContent == color){
        alert('bien');
        points++;
    } else {
        alert('mal');
        points--;
    }
    pointsDiv.textContent = points;
    Object.values(options)
            .forEach((value) => {
                if(value.textContent != color){
                    value.style['background-color'] = '#F00';
                } else {
                    value.style['background-color'] = '#0F0';
                }
            })
    hasChosen = true;
}

window.addEventListener('load', init(), false)