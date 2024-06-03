import axios from 'axios';

// https://api.themoviedb.org/3/genre/movie/list
const Config = {
  baseURL: 'https://api.themoviedb.org/3',
  token:
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDJhMDdmYzE1YWVjNDcwZjljZjNkNzAwMjE0ZDhmMSIsInN1YiI6IjY2NWJhODgyODU1ZDc2ODRhNjQ3ZDY0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J8RSh_GeNP1-MyE-X7ouYFvoYhLf9cy-OEz_odfh7sQ',
};

export const getGenreList = async () => {
  try {
    const response = await axios.get(`${Config.baseURL}/genre/movie/list`, {
      headers: {
        Authorization: `Bearer ${Config.token}`,
      },
    });
    const data = response.data;
    const status = response.status;
    return {success: true, data: data, status: status};
  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
};

export const getUpcomingMovies = async () => {
  try {
    const response = await axios.get(`${Config.baseURL}/movie/upcoming`, {
      headers: {
        Authorization: `Bearer ${Config.token}`,
      },
    });
    const data = response.data;
    const status = response.status;
    return {success: true, data: data, status: status};
  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
};

export const getNowPlayingMovies = async () => {
  try {
    const response = await axios.get(`${Config.baseURL}/movie/now_playing`, {
      headers: {
        Authorization: `Bearer ${Config.token}`,
      },
    });
    const data = response.data;
    const status = response.status;
    return {success: true, data: data, status: status};
  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
};

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${Config.baseURL}/movie/popular`, {
      headers: {
        Authorization: `Bearer ${Config.token}`,
      },
    });
    const data = response.data;
    const status = response.status;
    return {success: true, data: data, status: status};
  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
};

export const getTopRatedMovies = async () => {
  try {
    const response = await axios.get(`${Config.baseURL}/top_rated`, {
      headers: {
        Authorization: `Bearer ${Config.token}`,
      },
    });
    const data = response.data;
    const status = response.status;
    return {success: true, data: data, status: status};
  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
};

//https://api.themoviedb.org/3/discover/movie

export const getGenreMovies = async (genre) => {
    try {
      const response = await axios.get(`${Config.baseURL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2012-01-01&primary_release_date.lte=2024-12-31`, {
        headers: {
          Authorization: `Bearer ${Config.token}`,
        },
      });
      const data = response.data;
      const status = response.status;
      return {success: true, data: data, status: status};
    } catch (error) {
      console.log(error);
      return {success: false, data: error};
    }
  };