import React from 'react'
import { StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import FilmList from './FilmList'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import { connect } from 'react-redux'

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.page = 0
    this.totalPages = 0
    this.searchedText = ''
    this.state = {
      films: [],
      isLoading: false
    }
    this._loadFilms = this._loadFilms.bind(this)
  }

  _loadFilms() {
    this.setState({ isLoading: true })
    if (this.searchedText.length > 0) {
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
        this.page = data.page
        this.totalPages = data.total_pages
        this.setState({
          isLoading: false,
          films: [ ...this.state.films, ...data.results]
        })
      })
    }
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _searchedTextInputChanged(text) {
    this.searchedText = text
  }

  _searchFilms() {
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: []
    }, () => {
      this._loadFilms()
    })
  }

  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate('FilmDetail', { idFilm: idFilm })
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Saisissez le titre d'un film"
          onSubmitEditing={() => this._searchFilms()}
          onChangeText={(text) => this._searchedTextInputChanged(text)}/>
        <Button style={styles.buttonSearch} title="Rechercher" onPress={ () => this._searchFilms() }/>
        <FilmList
          films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
          navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
          loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
          page={this.page}
          totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  textInput: {
    marginLeft: 15,
    marginRight: 15,
    height: 50,
    borderColor: "#000",
    borderWidth: 1,
    paddingLeft: 10,
  },
  buttonSearch: {
    height: 50,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

// On connecte le store Redux, ainsi que les films favoris du state de notre application, à notre component Search
const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(Search)
