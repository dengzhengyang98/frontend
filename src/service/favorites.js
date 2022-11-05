import axios from "axios";

class FavoritesDataService {
    getFavorites(query) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URI}/api/v1/movies/favorites/${query}`);
    }

    addFavorite(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URI}/api/v1/movies/favorites`, {data});
    }
}

export default new FavoritesDataService();