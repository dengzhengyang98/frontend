import React, {useState, useEffect } from 'react';
import MovieDataService from '../service/movies';
import {  useParams, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

const Movie = ({user}) => {
    let params = useParams();

    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated: "",
        reviews: [],
        plot: "",
        poster: ""
    });

    const deleteReview = (reviewId, index) => {
        let data = {
            review_id: reviewId,
            user_id: user.googleId
        }
        MovieDataService.deleteReview(data)
            .then(response => {
                setMovie((prevState) => {
                    prevState.reviews.splice(index, 1);
                console.log(response)
                return ({
                    ...prevState
                })
                })
            })
            .catch(e => {
                console.log(e)
            })
    }

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
                                { user && 
                                    <Link to={"/movies/" + params.id + "/review"}>
                                        Add Review
                                    </Link> }
                            </Card.Body>
                        </Card>
                        <h2>Reviews</h2>
                        <br></br>
                        {movie.reviews.map((review, index) => {
                            return (
                                <div className="d-flex">
                                    <div className="flex-shrink-0 reviewsText">
                                        <h5>{review.name + " reviewed on "} {moment(review.date).format("Do MMMM YYYY")}</h5>
                                        <p className="review">{review.review}</p>
                                        {
                                            user && user.googleId === review.user_id && 
                                            <Row>
                                                <Col>
                                                    <Link to={{
                                                        pathname: "/movies/" + params.id + "/review"
                                                    }}
                                                        state={{
                                                            currentReview: review
                                                        }}>
                                                        Edit
                                                    </Link>
                                                </Col>
                                                <Col>
                                                    <Button variant="link" onClick={ () => {
                                                        deleteReview(review._id, index)
                                                    }}> 
                                                    Delete
                                                    </Button>
                                                </Col>
                                            </Row>
                                        }
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

