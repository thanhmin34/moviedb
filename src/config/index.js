export const fetcher = (...args) => fetch(...args).then((res) => res.json());
// https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1
const key = "92f81e121c32d0b9ad19e4e7851187ca";
const apiMovie = "https://api.themoviedb.org/3/movie";
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=92f81e121c32d0b9ad19e4e7851187ca
export const movieApi = {
  getMovie: (type, query = "") => `${apiMovie}/${type}?api_key=${key}${query}`,
  getSlider: (slide) => `https://image.tmdb.org/t/p/original/${slide}`,
  getImgage: (img) => `https://image.tmdb.org/t/p/w500/${img}`,
};
