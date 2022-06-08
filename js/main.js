import config from '../config.json' assert { type: 'json' };

const api = `http://www.omdbapi.com/?apikey=${config.api_key}&type=movie&r=json&s=`;
const form = document.querySelector('form');
const input = document.querySelector('form input');

const content = document.querySelector('#content');

form.addEventListener('submit', e => {
  e.preventDefault();
  const inputValue = input.value;
  if (inputValue) {
    fetch(api + inputValue)
      .then(res => res.json())
      .then(data => showResult(data));
  }
  form.reset();
});

function showResult(obj) {
  const { Response, Error } = obj;
  console.log(obj);
  if (Response === 'True') {
    const results = obj.Search.map(result => result);
    results.forEach(r => {
      const { Title, imdbRating, Year, Runtime, Genre, Plot, Poster } = r;

      const card = `<div class="movie-card">
          <div class="poster">
            <img
              src="${Poster}"
              alt=""
            />
          </div>
          <div class="movie-info">
            <div class="top">
              <p class="movie-title">${Title} (${Year})</p>
              <p class="movie-rating"><i class="fa-solid fa-star"></i> ${imdbRating}</p>
              <button class="btn-add">
                <i class="fa-solid fa-plus"></i><span>Watchlist</span>
              </button>
            </div>
            <div class="middle">
              <p class="movie-runtime">${Runtime}</p>
              <div class="movie-tags">
              <p>Help</p>
              </div>
            </div>
            <div class="summary">
              <p>
                ${Plot}
              </p>
            </div>
          </div>
        </div>`;
      // content.innerHTML = card;
    });
  } else {
    console.log(Error);
  }
}

function addHere() {
  return document.querySelector('.add-btn');
}
