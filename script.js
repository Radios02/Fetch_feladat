const fetchType = document.getElementById('fetchType');
const jokeIdInput = document.getElementById('jokeId');
const jokeTypeSelect = document.getElementById('jokeType');
const fetchBtn = document.getElementById('fetchBtn');
const jokeDisplay = document.getElementById('jokeDisplay');
const nextBtn = document.getElementById('nextBtn');

let lastType = 'random';
let lastValue = null;