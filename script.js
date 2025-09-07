const fetchType = document.getElementById('fetchType');
const jokeIdInput = document.getElementById('jokeId');
const jokeTypeSelect = document.getElementById('jokeType');
const fetchBtn = document.getElementById('fetchBtn');
const jokeDisplay = document.getElementById('jokeDisplay');
const nextBtn = document.getElementById('nextBtn');

let lastType = 'random';
let lastValue = null;

fetchType.addEventListener('change', () => {
    jokeIdInput.style.display = 'none';
    jokeTypeSelect.style.display = 'none';
    if (fetchType.value === 'id') {
        jokeIdInput.style.display = 'inline-block';
    } else if (fetchType.value === 'type') {
        jokeTypeSelect.style.display = 'inline-block';
    }
});

function showJoke(joke) {
    if (joke.type === 'knock-knock') {
        jokeDisplay.innerHTML = `<b>${joke.setup}</b><br>${joke.punchline}`;
    } else {
        jokeDisplay.innerHTML = `<b>${joke.setup}</b><br>${joke.punchline}`;
    }
    nextBtn.style.display = (lastType === 'random' || lastType === 'type') ? 'inline-block' : 'none';
}