// import { displayResults } from './utils.js';

const content = document.querySelector('#content');

let keys = Object.keys(localStorage);

let storageArr = keys.map(key => JSON.parse(localStorage[key]));

function displayResults(storageArr) {
  content.innerHTML = '';
  storageArr.forEach(a => {
    const { Poster, Title, Year, imdbRating, Runtime, Genre, Plot, imdbID } = a;

    const card = `<div class="movie-card">
  <div class="poster">
    <img src="${Poster}" alt="" />
  </div>
  <div class="movie-info">
    <div class="top">
      <p class="movie-title">${Title} (${Year})</p>
      <p class="movie-rating"><i class="fa-solid fa-star"></i> ${imdbRating}</p>
      <button id="${imdbID}" class="btn-toggle btn-remove" >
        <i class="fa-solid fa-minus"></i><span>Watchlist</span>
      </button>
    </div>
    <div class="middle">
      <p class="movie-runtime">${Runtime}</p>
      <div class="movie-tags">
        ${Genre.split(',')
          .map(g => `<p>${g}</p>`)
          .join('')}
      </div>
    </div>
    <div class="summary">
      <p>
        ${Plot}
      </p>
    </div>
  </div>
  </div>`;
    content.innerHTML += card;
  });
}

function updateArr() {
  keys = Object.keys(localStorage);
  storageArr = keys.map(key => JSON.parse(localStorage[key]));
}

function checkStorage() {
  updateArr();
  if (localStorage.length >= 1) {
    displayResults(storageArr);
  } else {
    content.innerHTML = `<div class="page">
    <i class="fa-solid fa-heart-crack fa-5x"></i>
    <h2>Your watchlist is looking a little empty</h2>
  </div>`;
  }
}

content.addEventListener('click', e => {
  const target = e.target;
  if (target.nodeName === 'BUTTON') {
    e.target.closest('.movie-card').remove();
    window.localStorage.removeItem(target.id);
    checkStorage();
  }
});

checkStorage();

export { storageArr };
