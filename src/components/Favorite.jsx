import React from "react";
import Featured from "./Featured";

export default function Favorite(props){


    function FavoriteClick(feature, e){ 
        // setFeatured(prev => prev.map(fea => ( fea.id === feature.id ? { ...fea, favorite: !fea.favorite} : fea)));

        console.log(feature);
        e.stopPropagation();
      }

      function itemClicks(item){
        console.log(item);
      }

    return(
       <Featured title="Favorites" featured={props.favorites} FeaturedItemClick={itemClicks} favoriteClick={FavoriteClick} />
    )
}