import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'

class FilmItem extends React.Component {
  render() {
    const { film, displayDetailForFilm } = this.props
    return (
      <TouchableOpacity
        onPress={() => displayDetailForFilm(film.id)}
        style={styles.mainContainer}>
        <Image style={styles.imageContent} source={({uri: getImageFromApi(film.poster_path)})}/>
        <View style={styles.detailsContainer}>
          <View style={styles.detailsHeader}>
            <Text style={styles.movieTitle}>{film.title}</Text>
            <Text style={styles.movieVote}>{film.vote_average}</Text>
          </View>
          <View style={styles.movieDescription}>
            <Text style={styles.movieDescriptionText} numberOfLines={6}>{film.overview}</Text>
          </View>
          <View style={styles.movieDate}>
            <Text style={styles.movieDateText}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 190,
    flex: 1,
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: 'whitesmoke'
  },
  imageContent: {
    width: 120,
    height: 180,
    margin: 4,
    backgroundColor: 'lightgrey'
  },
  detailsContainer: {
    flex: 1,
    padding: 4
  },
  detailsHeader: {
    flex: 2,
    flexDirection: 'row',
  },
  movieTitle: {
    flex: 2,
    padding: 3,
    fontSize: 18,
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },
  movieVote: {
    flex: 1,
    padding: 3,
    fontSize: 20,
    color: '#373635',
    fontWeight: 'bold',
    textAlign: 'right'
  },
  movieDescription: {
    flex: 2,
  },
  movieDescriptionText: {
    padding: 3,
    color: 'grey',
    fontStyle: 'italic'
  },
  movieDate: {
    flex: 1,
    justifyContent: 'center'
  },
  movieDateText: {
    padding: 3,
    textAlign: 'right'
  }
})

export default FilmItem
