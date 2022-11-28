import { useCallback, useState,useEffect } from 'react'
import Card from './Card.js'

import FavoritesDataService from '../service/favorites.js'
import MovieDataService from "../service/movies";
import Container from 'react-bootstrap/Container';
const style = {
    width: 400,
}


const Favorites = ({favorites,user}) => {
    const [cards, setCards] = useState([])


    useEffect(()=>{
        if(favorites?.length>0){
            const requestApiList = favorites.map(item=>(MovieDataService.findById(item)))
            Promise.all(requestApiList).then(res=>{
                const data = res.map((item,index)=>{
                    return {
                        ...item.data,
                        id:index,
                        text:item.data.title,
                        poster:item.data.poster
                    }
                })
                console.log(data,'data')
                setCards(data);
            })
        }
    },[favorites])
    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const newCards = [...cards]
        newCards[dragIndex] = newCards.splice(hoverIndex,1,newCards[dragIndex])[0];
        setCards(newCards)
        if(user?.googleId && newCards.length>0){
            FavoritesDataService.updateFavoritesList({
                _id:user.googleId,
                favorites:newCards.map(item=>item._id)
            })
        }
    }, [cards])
    const renderCard = useCallback((card, index) => {
        return (
            <Card
                key={card.id}
                index={index}
                id={card.id}
                text={card.text}
                moveCard={moveCard}
                poster={card.poster}
            />
        )
    }, [cards])
    if(!user?.googleId){
        return <div>please login</div>
    }
    return (
        <div className="App">
            <Container>
                <div style={style}>{cards.map((card, i) => renderCard(card, i+1))}</div>
            </Container>
        </div>
    )
}

export default Favorites;