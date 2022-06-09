import config from '../config.json' assert { type: 'json' };
import { displayResults } from './utils.js';

const api = `http://www.omdbapi.com/?apikey=${config.api_key}&type=movie`;
const form = document.querySelector('form');
const input = document.querySelector('form input');
const pageResults = [];

const content = document.querySelector('#content');

form.addEventListener('submit', search);

// take input
function search(e) {
  e.preventDefault();
  const value = input.value;
  content.innerHTML = '';
  searchApi(value);
  form.reset();
}

// search input
async function searchApi(value) {
  const res = await fetch(`${api}&s=${value}`);
  const data = await res.json();

  console.log(data);
  listMovies(data);
}

async function listMovies(data) {
  const movies = await data.Search;
  console.log(movies);
  movies.forEach(async movie => {
    const res = await fetch(`${api}&i=${movie.imdbID}`);
    const data = await res.json();
    displayResults(data);
  });
}

content.addEventListener('click', e => {
  const target = e.target;
  if (target.nodeName === 'BUTTON') {
    fetch(`${api}&i=${target.id}`)
      .then(res => res.json())
      .then(data =>
        window.localStorage.setItem(target.id, JSON.stringify(data))
      );
  }
});

export { pageResults };
