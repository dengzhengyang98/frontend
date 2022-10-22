import React, {useState, useEffect} from 'react';
import MovieDataService from '../service/movies';
import {  useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Movie = props => {
    let params = useParams();

    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated: "",
        reviews: [],
        plot: "",
        poster: ""
    });

    useEffect(() => {
        const getMovie = id => {
            //TODO:
            MovieDataService.findById(id)
                .then(response => {
                    setMovie({id: response.data["_id"],
                            title: response.data["title"],
                            rated: response.data["rated"],
                            reviews: response.data["reviews"],
                            plot: response.data["plot"],
                            poster: response.data["poster"]})
                })
                .catch(e => {
                    console.log(e)
                })
        }
        getMovie(params.id)
    }, [params.id])

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                    <div className="poster">
                        <Image
                            className="bigPicture"
                            src={movie.poster+"/100px250"}    
                            fluid
                            onError={
                                (e) => {
                                    e.target.src = "/images/NoPosterAvailable-crop.jpg"
                                }
                            }
                             />
                    </div>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">
                                {movie.title}
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {movie.plot}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <h2>Reviews</h2>
                        <br></br>
                        {movie.reviews.map((review, index) => {
                            return (
                                <div className="d-flex">
                                    <div className="flex-shrink-0 reviewsText">
                                        <h5>{review.name + " reviewed on "}</h5>
                                        <p className="review">{review.review}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Movie;

