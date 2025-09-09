const fetchType = document.getElementById('fetchType');
const jokeIdInput = document.getElementById('jokeId');
const jokeTypeSelect = document.getElementById('jokeType');
const fetchBtn = document.getElementById('fetchBtn');
const jokeDisplay = document.getElementById('jokeDisplay');
const nextBtn = document.getElementById('nextBtn');

let lastType = 'random';
let category = null;

// NAV gombok kezelése
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    lastType = btn.getAttribute('data-type');
    jokeIdInput.style.display = lastType === 'id' ? 'inline-block' : 'none';
    jokeTypeSelect.style.display = lastType === 'type' ? 'inline-block' : 'none';
    jokeDisplay.textContent = ''; // Vicc törlése menüpont váltáskor
    nextBtn.style.display = 'none'; // Következő gomb elrejtése
  });
});

function showJoke(joke) {
    if (joke.type === 'knock-knock') {
        jokeDisplay.innerHTML = `<b>${joke.setup}</b><br>${joke.punchline}`;
    } else {
        jokeDisplay.innerHTML = `<b>${joke.setup}</b><br>${joke.punchline}`;
    }
    nextBtn.style.display = (lastType === 'random' || lastType === 'type') ? 'inline-block' : 'none';
}

async function fetchJoke(type, category) {
    let url = '';
    if (type === 'random') {
        url = 'https://official-joke-api.appspot.com/random_joke';
    } else if (type === 'id') {
        url = `https://official-joke-api.appspot.com/jokes/${category}`;
    } else if (type === 'type') {
        url = `https://official-joke-api.appspot.com/jokes/${category}/random`;
    }
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (Array.isArray(data)) {
            showJoke(data[0]);
        } else if (data.setup) {
            showJoke(data);
        } else {
            jokeDisplay.textContent = 'Nem található ilyen vicc!';
            nextBtn.style.display = 'none';
        }
    } catch {
        jokeDisplay.textContent = 'Hiba történt a lekérés során!';
        nextBtn.style.display = 'none';
    }
}

// Lekérés gomb
fetchBtn.addEventListener('click', () => {
    if (lastType === 'id') {
        category = jokeIdInput.value;
        fetchJoke('id', category);
    } else if (lastType === 'type') {
        category = jokeTypeSelect.value;
        fetchJoke('type', category);
    } else {
        fetchJoke('random');
    }
});

// Következő vicc gomb
nextBtn.addEventListener('click', () => {
    if (lastType === 'random') {
        fetchJoke('random');
    } else if (lastType === 'type') {
        fetchJoke('type', category);
    }
});