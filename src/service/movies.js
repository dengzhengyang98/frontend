import axios from "axios";

class MoviesDataService {
    getAll(page = 0) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URI}/api/v1/movies?page=${page}`);
    }

    find(query, by="title", page=0) {
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URI}/api/v1/movies?${by}=${query}&page=${page}`
        )
    }

    getRatings() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URI}/api/v1/movies/ratings`);
    }

    findById(query) {
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URI}/api/v1/movies/id/${query}`
        )
    }

    createReview(data) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URI}/api/v1/movies/review`, data);
    }

    updateReview(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URI}/api/v1/movies/review`, data);
    }

    deleteReview(data) {
        return axios.delete(`${process.env.REACT_APP_API_BASE_URI}/api/v1/movies/review`, {data});
    }
    
}

export default new MoviesDataService();