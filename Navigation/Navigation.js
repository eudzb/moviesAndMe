import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  FilmDetail: {
    screen: FilmDetail,
    navigationOptions: {
      title: 'Détails'
    }
  }
})

const FavoritesStackNavigator = createStackNavigator({
  Search: {
    screen: Favorites,
    navigationOptions: {
      title: 'Favoris'
    }
  },
  FilmDetail: {
    screen: FilmDetail,
    navigationOptions: {
      title: 'Détails'
    }
  }
})

const MoviesTabNavigator = createBottomTabNavigator({
  Search: {
    screen: SearchStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../img/search.png')}
          style={styles.icon} />
      }
    }
  },
  Favorites: {
    screen: FavoritesStackNavigator,
    navigationOptions: {
      title: 'Rechercher',
      tabBarIcon: () => {
        return <Image
          source={require('../img/fav.png')}
          style={styles.icon} />
      }
    }
  }
}, {
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
    activeBackgroundColor: '#DDDDDD',
    inactiveBackgroundColor: '#fff'
  }
})

const styles = StyleSheet.create({
  icon: {
    height: 30,
    width: 30
  }
})

export default createAppContainer(MoviesTabNavigator)
