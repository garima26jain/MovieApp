import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import HomeBanner from '../../components/HomeBanner';
import MovieCards from '../../components/MovieCards';
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getGenreList,
  getGenreMovies,
} from '../../apis/Network';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const Home = () => {
  const [nowPlayingData, setnowPlayingData] = useState([]);
  const [popularMoviesData, setpopularMoviesData] = useState([]);
  const [top_ratedData, settop_ratedData] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const handleApi = async () => {
      const {data, status} = await getGenreList();
      if (status === 200) {
        setGenreList([{id: '000009', name: 'All'}, ...data.genres]);
      } else {
        Alert.alert(`Request failed with ${data}`);
      }
    };
    handleApi();
  }, []);

  useEffect(() => {
    const handleApi = async () => {
      const {data, status} = await getNowPlayingMovies();
      if (status === 200) {
        setnowPlayingData(data.results);
      } else {
        Alert.alert(`Request failed with ${data}`);
      }
    };
    handleApi();
  }, []);

  useEffect(() => {
    const handleApi = async () => {
      const {data, status} = await getPopularMovies();
      if (status === 200) {
        setpopularMoviesData(data.results);
      } else {
        Alert.alert(`Request failed with ${data}`);
      }
    };
    handleApi();
  }, []);
  useEffect(() => {
    const handleApi = async () => {
      const {data, status} = await getTopRatedMovies();
      if (status === 200) {
        settop_ratedData(data.results);
      } else {
        Alert.alert(`Request failed with ${data}`);
      }
    };
    handleApi();
  }, []);

  const handleOnClick = async selectedGenre => {
    console.log({selectedGenre});
    const {data, status} = await getGenreMovies(selectedGenre);
    console.log('selectedGenre movies', data);
    if (status === 200) {
      setFilteredMovies(data.results);
    } else {
      Alert.alert(`Request failed with ${data}`);
    }
  };

  const renderGenre = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => handleOnClick(item.name)}>
        <Text style={styles.genreBox}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  let startYear = 2012;
  let endYear = 2024;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'default'}
        translucent
        backgroundColor={'transparent'}
      />
      <ScrollView style={styles.scrollView}>
        <HomeBanner />
        <View style={styles.genreContainer}>
          <FlatList
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            horizontal
            data={genreList}
            renderItem={renderGenre}
            ItemSeparatorComponent={() => <View style={{width: 15}}></View>}
          />
        </View>
        {/* <Text style={styles.year}> Please select a genre to view movies</Text> */}
        {/* {!filteredMovies.length ? (
          <Text style={styles.year}>No movies for the selected filter</Text>
        ) : ( */}
        <View style={styles.subContainer}>
          {Array(endYear - startYear + 1)
            .fill()
            .map((_, index) => (
              <Text Key={index} style={styles.year}>
                <MovieCards
                  title={`${startYear + index}`}
                  data={nowPlayingData}
                />
              </Text>
            ))}
        </View>
        {/* )} */}
        <View style={styles.subContainer}></View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  subContainer: {
    paddingHorizontal: 15,
    gap: 10,
    marginTop: 20,
  },
  genreContainer: {
    flex: 1,
    gap: 10,
    marginTop: 20,
  },
  genreBox: {
    borderRadius: 25, //this is not getting applied
    fontWeight: 500,
    color: ' #fff',
    backgroundColor: 'red',
    flexWrap: 'wrap',
    textAlign: 'center',
    padding: 10,
  },
  year: {
    fontWeight: 500,
    color: 'white',
    backgroundColor: 'transparent',
    flexWrap: 'wrap',
    padding: 10,
  },
});
