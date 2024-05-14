import React, { useEffect } from "react";
import Loading from '../img/loading.svg'
import FavWhite from '../img/favorite-white.svg';
import FavRed from '../img/favorite-red.svg';

export default function Trending(props){

    const [load, setLoad] = React.useState(false)

    React.useEffect(() => {
        setLoad(true);

        setTimeout(function(){
            setLoad(false)
        }, 700)

        console.log(props.SearchImg);

    }, [props.SearchImg])


    return(
        <section className="featured-section">
            <h2>{props.title}</h2>
            <ul className="flex-section">
                { props.featured.map((feature, index) => <li onClick={() => 
                    props.FeaturedItemClick(feature.content_description)} 
                    key={index} >
                        <button type="button" onClick={(e) => props.favTrigger(feature, e)} className="favorite"><img src={feature.favorite ? FavRed : FavWhite} alt="Favorite" /></button>
                        <img src={load ? Loading : feature.media[0].tinygif.url} alt={feature.content_description} loading="lazy"  />
                        <span className="text-truncate content" title={feature.content_description}>{feature.content_description}</span>
                </li>) }
            </ul>
        </section>
    )
}