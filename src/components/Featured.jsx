import React from "react";
import Loading from '../img/loading.svg'
import FavWhite from '../img/favorite-white.svg';
import FavRed from '../img/favorite-red.svg';
import NoFav from '../img/no-favorite.png';

export default function Trending({filter, title, featured, favTrigger, FeaturedItemClick, loadMore, isSticker="featured"}){

    const [load, setLoad] = React.useState(false)

    React.useEffect(() => {
        setLoad(true);

        setTimeout(function(){
            setLoad(false)
        }, 500)

        console.log(filter.search);

    }, [filter.search])


    return(
        <section className="featured-section">
            <h2>{title}</h2>
            <ul className="flex-section">
                { featured.map((feature, index) => <li onClick={() => 
                    FeaturedItemClick(feature, isSticker ?? "featured")} 
                    key={index} >
                        <button type="button" onClick={(e) => favTrigger(feature, e)} className="favorite btn"><img src={feature.favorite ? FavRed : FavWhite} alt="Favorite" /></button>
                        <img src={load ? Loading : feature.media[0].tinygif.url} alt={feature.content_description} loading="lazy"  />
                        <span className="text-truncate content" title={feature.content_description}>{feature.content_description}</span>
                </li>) }
            </ul>

            {!featured.length && 
                <div className="text-center">
                    <img src={NoFav} alt="No items" />
                    <h3>No items</h3>
                </div>
            }
            
            <div className="pagination">
                {(filter.pagination || loadMore) && <p>Showing 1 to {filter.limit} of 50 results</p>}
                {filter.limit !== 50 && (filter.pagination || loadMore ) && <button className="loadmore btn btn-primary btn-lg" onClick={() => loadMore(10) }>Load More</button>}
            </div>
        </section>
    )
}