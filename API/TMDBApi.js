const API_TOKEN = 'ec1e53e5dd91a59cad756a2c4b59d113'

export function getFilmsFromApiWithSearchedText(text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page=' + page
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err))
}

export function getImageFromApi(name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}

export function getFilmDetailFromApi(id) {
  const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr'
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err))
}
