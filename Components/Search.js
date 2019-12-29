import React from 'react'
import { StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator} from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.page = 0
    this.totalPages = 0
    this.state = {
      films: [],
      isLoading: false
    }
    this.searchedText = ''
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
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          onEndReachThreashold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages) {
              this._loadFilms()
            }
          }}
          renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm} />}
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

export default Search
