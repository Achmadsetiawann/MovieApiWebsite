import React, { Component } from 'react';
import { API_URL, API_KEY } from '../../config';
import Navigation from '../elements/Navigation/Navigation';
import MovieInfo from '../elements/MovieInfo/MovieInfo';
import MovieInfoBar from '../elements/MovieInfoBar/MovieInfoBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import Actor from '../elements/Actor/Actor';
import Spinner from '../elements/Spinner/Spinner';
import './Movie.css';

class Movie extends Component {
    state = {
        movie: null,
        actors: null,
        directors: [],
        loading: false
    }

    componentDidMount() {
        this.setState({ loading:true })
        // First Fetch the movie ...
        const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
        this.fetchItems(endpoint);
    }

    fetchItems = (endpoint) => {
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            if(result.status_code) {
                this.setState({ loading: false });
            } else {
                this.setState({ movie: result }, () => {
                    // ... fetch actors in the setstate callback function
                    const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credit?api_key=${API_KEY}`;
                    fetch(endpoint)
                    .then(result => result.json())
                    .then(result => {
                        const directors = result.crew.filter( (member) => member.job === "Director");
                        this.setState ({
                            actors: result.cast,
                            directors,
                            loading: false
                        })
                    })
                })
            }
        })
        .catch(error => console.error('Error', error))
    }


    render() {
        return (
            <div className="rmdb-movie">
                <Navigation />
                <MovieInfo />
                <MovieInfoBar />
                <FourColGrid />
                <Spinner />
            </div>
        )
    }
}

export default Movie;