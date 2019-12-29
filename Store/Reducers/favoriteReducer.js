const initialState = { favoritesFilm: [] }

function toggleFavorite(state = initialState, action) {
  let nextState
  switch(action.type) {
    case 'TOGGLE_FAVORITE':
      const favoritesFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id)
      if (favoritesFilmIndex !== -1) {
        // delete
        nextState = {
          ...state,
          favoritesFilm: state.favoritesFilm.filter((item, index) => index !== favoritesFilmIndex)
        }
      } else {
        // add
        nextState = {
          ...state,
          favoritesFilm: [ ...state.favoritesFilm, action.value ]
        }
      }
      return nextState || state
    default:
      return state
  }
}

export default toggleFavorite
