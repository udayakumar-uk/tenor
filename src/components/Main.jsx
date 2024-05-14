import React from "react";
import Sticker from "./Sticker";
import Featured from "./Featured";


export default function Main({filter, sticker, featured, itemClicks, FavoriteClick}){
  
    // const [sticker, setSticker] = React.useState([]);
    // const [featured, setFeatured] = React.useState([]);

    // React.useEffect(() => {
              
    //   const favorites = featured.filter(fea => fea.favorite === true);
    //   props.updateFavorite(favorites)
      

    // }, [featured]);

    // React.useEffect(() => {
    //   fetchStickerData();
    //   fetchFeaturedData();
    // }, [props.filter.search]);


    //   async function fetchStickerData(){
    //     var stickerData = await fetch('https://g.tenor.com/v1/search?&searchfilter=sticker&media_filter=tinygif&q='+props.filter.search+'&key='+props.filter.key)
    //     .then(res=>res.json())
    //     .then(data => data.results);
    //     setSticker(stickerData);
    //     console.log(stickerData);
    //   }
      
    //   async function fetchFeaturedData(){
    //     var featuredData = await fetch('https://g.tenor.com/v1/search?key='+props.filter.key+'&q='+props.filter.search+'&limit='+props.filter.limit)
    //     .then(res=>res.json())
    //     .then(data => data.results);

    //     featuredData = featuredData.map(fea => ({ ...fea, favorite: false}));

    //     setFeatured(featuredData);

    //     console.log(featuredData);
    //   }


      function StickerSlideControl(button){
        var slider = document.getElementById('stickerSlider');
        slider.scrollBy((button == 'next' ? 500 : -500), 0)
      }

    //   function FavoriteClick(feature, e){ 
    //     setFeatured(prev => prev.map(fea => ( fea.id === feature.id ? { ...fea, favorite: !fea.favorite} : fea)));

    //     e.stopPropagation();
    //   }

    //   function itemClicks(item){
    //     console.log(item);
    //   }

    
      function mainFavoriteClick(feature, e){ 
        FavoriteClick(feature, e)
      }

    return(
        <>
            <Sticker sticker={sticker} StickerSlideControl={StickerSlideControl} stickerItemClick={itemClicks} SearchImg={filter.search} />
            <Featured title="Featured" featured={featured} FeaturedItemClick={itemClicks} favTrigger={mainFavoriteClick} SearchImg={filter.search} />
            {/* FeaturedPagination={FeaturedPagination} */}
        </>
    )
}