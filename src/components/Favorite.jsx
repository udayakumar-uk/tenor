import React from "react";
import Featured from "./Featured";

export default function Favorite({favorites, itemClicks, FavoriteClick}){


    // function FavoriteClick(feature, e){ 
    //     // setFeatured(prev => prev.map(fea => ( fea.id === feature.id ? { ...fea, favorite: !fea.favorite} : fea)));

    //     console.log(feature);
    //     e.stopPropagation();
    //   }

      function itemClicks(item){
        console.log(item);
      }

      
    
      function mainFavoriteClick(feature, e){ 
        FavoriteClick(feature, e)
      }

    return(
       <Featured title="Favorite" featured={favorites} FeaturedItemClick={itemClicks} favTrigger={mainFavoriteClick} SearchImg="" />
    )
}