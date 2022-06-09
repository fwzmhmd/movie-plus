import { pageResults } from './main.js';

function displayResults(arr) {
  const { Poster, Title, Year, imdbRating, Runtime, Genre, Plot, imdbID } = arr;
  pageResults.push(arr);
  const card = `<div class="movie-card">
  <div class="poster">
    <img src="${Poster}" alt="" />
  </div>
  <div class="movie-info">
    <div class="top">
      <p class="movie-title">${Title} (${Year})</p>
      <p class="movie-rating"><i class="fa-solid fa-star"></i> ${imdbRating}</p>
      <button id="${imdbID}" class="btn-add" >
        <i class="fa-solid fa-plus"></i><span>Watchlist</span>
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
  console.log(pageResults);
}

export { displayResults };
