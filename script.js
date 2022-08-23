let pointsDiv = document.querySelector('.pointsSection-points'),
    questionColor = document.querySelector('.playSection-question-color'),
    options = document.getElementsByClassName('playSection-options-colorOption'),
    colorCircle = document.querySelector('.colorCircle'),
    modal = document.querySelector('.pointsSavedDialog');

let points = 0;
let color = '';
let hasChosen = true;

const checkForPoints = () => {
    if(localStorage.getItem('GTCPoints'))
    {
        modal.querySelector('.messagePoints').textContent += localStorage.getItem('GTCPoints');
        modal.show();
    }
}

document.querySelector('.discardDataBtn').addEventListener('click', () => {
    localStorage.removeItem('GTCPoints');
    modal.close();
}, false)

document.querySelector('.loadDataBtn').addEventListener('click', () => {
    points = localStorage.getItem('GTCPoints');
    pointsDiv.textContent = points;
    modal.close();
}, false)

const init =  () => {
    checkForPoints();
    console.log('a');
    pointsDiv.textContent = points;
    Object.entries(options)
            .forEach(([key, value]) => {
                value.textContent = '';
                value.addEventListener('click', (e) => {validateOption(e)});
            })
    hasChosen = true;
    startRound();
}

const reset = () => {
    points = 0;
    pointsDiv.textContent = points;
    localStorage.removeItem('GTCPoints');
    Object.entries(options)
            .forEach(([key, value]) => {
                value.textContent = '';
                value.addEventListener('click', (event) => {validateOption(event)});
            })
    hasChosen = true;
    startRound();
}

const startRound = () => {
    if(!hasChosen){return;}
    hasChosen = false;
    Object.values(options)
            .forEach((value) => { value.style['background-color'] = '#7B435B';})

    color = Math.floor(Math.random()* 255) + ', ' +
                Math.floor(Math.random()* 255) + ', ' +
                Math.floor(Math.random()* 255);

    let bait1 = Math.floor(Math.random()* 255) + ', ' +
                Math.floor(Math.random()* 255) + ', ' +
                Math.floor(Math.random()* 255);
    
    let bait2 = Math.floor(Math.random()* 255) + ', ' +
                Math.floor(Math.random()* 255) + ', ' +
                Math.floor(Math.random()* 255);

    questionColor.style['background-color'] = 'rgb(' + color + ')';
    let sortedOptions = Object.values(options).sort(() => Math.random() - 0.5);
    sortedOptions[0].textContent = color;
    sortedOptions[1].textContent = bait1;
    sortedOptions[2].textContent = bait2;
}

const validateOption = (event) => {
    const btn = event.target;
    btn.blur();

    if(hasChosen){return;}

    event.stopPropagation();
    event.preventDefault()

    if(btn.textContent == color){
        colorCircle.style['background-color'] = '#0F0';
        points++;
    } else {
        colorCircle.style['background-color'] = '#F00';
        points--;
    }
    pointsDiv.textContent = points;

    colorCircle.classList.add('colorCircle-show');
    colorCircle.addEventListener('webkitAnimationEnd', function(){
        colorCircle.classList.remove('colorCircle-show');
        colorCircle.removeEventListener('webkitAnimationEnd',  arguments.callee, false);
    }, false);
    
    Object.values(options)
            .forEach((value) => {
                if(value.textContent != color){
                    value.style['background-color'] = '#F00';
                } else {
                    value.style['background-color'] = '#0F0';
                }
            })
    hasChosen = true;
    localStorage.setItem('GTCPoints', points);
}

window.addEventListener('load', init(), false)
