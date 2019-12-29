import React from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator, ScrollView } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'

class FilmDetail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: true
    }
  }

  componentDidMount() {
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm)
      .then(data => {
        this.setState({
          film: data,
          isLoading: false
        })
      })
  }

  _displayFilm() {
    const film = this.state.film
    if (film != undefined) {
      return (
        <ScrollView style={styles.scrollViewContainer}>
          <Image style={styles.movieImage} source={({uri: getImageFromApi(film.backdrop_path)})}/>
          <Text style={styles.movieTitle}>{film.title}</Text>
          <Text style={styles.movieOverview}>{film.overview}</Text>
          <Text style={styles.movieDetails}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.movieDetails}>Note : {film.vote_average} / 10</Text>
          <Text style={styles.movieDetails}>Nombre de votes : {film.vote_count}</Text>
          <Text style={styles.movieDetails}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
          <Text style={styles.movieDetails}>Genre(s) : {film.genres.map(function(genre){
              return genre.name;
            }).join(" / ")}
          </Text>
          <Text style={styles.movieDetails}>Companie(s) : {film.production_companies.map(function(company){
              return company.name;
            }).join(" / ")}
          </Text>
          <Text style={styles.movieDetails}>Titre original : {film.original_title}</Text>
          <Text style={styles.movieDetails}>État : {film.status}</Text>
        </ScrollView>
      )
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

  render() {
    const idFilm = this.props.navigation.state.params.idFilm
    return (
      <View style={styles.mainContainer}>
        {this._displayFilm()}
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollViewContainer: {
    flex: 1
  },
  movieImage: {
    flex: 1,
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 8,
    marginRight: 8,
    height: 150
  },
  movieTitle: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    color: '#373635'
  },
  movieOverview: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 12,
    marginBottom: 18,
    color: 'grey',
    fontStyle: 'italic'
  },
  movieDetails: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 4
  }
})

export default FilmDetail
