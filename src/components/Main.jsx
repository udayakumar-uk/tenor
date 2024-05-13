import React from "react";
import Sticker from "./Sticker";
import Featured from "./Featured";


export default function Main(props){
  
    // const [oneTime, setOneTime] = React.useState(0);
    const [sticker, setSticker] = React.useState([]);
    const [featured, setFeatured] = React.useState([]);

    React.useEffect(() => {
        console.log(featured);

    }, [featured.length]);

    React.useEffect(() => {
      fetchStickerData();
      fetchFeaturedData();
    }, [props.filter.search]);


      async function fetchStickerData(){
        var stickerData = await fetch('https://g.tenor.com/v1/search?&searchfilter=sticker&media_filter=tinygif&q='+props.filter.search+'&key='+props.filter.key)
        .then(res=>res.json())
        .then(data => data.results);
        setSticker(stickerData);
        console.log(stickerData);
      }
      
      async function fetchFeaturedData(){
        var featuredData = await fetch('https://g.tenor.com/v1/search?key='+props.filter.key+'&q='+props.filter.search+'&limit='+props.filter.limit)
        .then(res=>res.json())
        .then(data => data.results);

        featuredData = featuredData.map(fea => ({ ...fea, favorite: false}));

        setFeatured(featuredData);

        console.log(featuredData);
      }


      function StickerSlideControl(button){
        var slider = document.getElementById('stickerSlider');
        slider.scrollBy((button == 'next' ? 500 : -500), 0)
      }

      function FavoriteClick(id, e){ 
        setFeatured(prev => prev.map(fea => ( fea.id === id ? { ...fea, favorite: !fea.favorite} : fea)));
        e.stopPropagation();
      }

      function itemClicks(item){
        console.log(item);
      }

    return(
        <main>
            {featured.favorite && <p>test</p>}
            <Sticker sticker={sticker} StickerSlideControl={StickerSlideControl} stickerItemClick={itemClicks} SearchImg={props.filter.search} />
            <Featured featured={featured} FeaturedItemClick={itemClicks} favoriteClick={FavoriteClick} SearchImg={props.filter.search} />
            {/* FeaturedPagination={FeaturedPagination} */}
        </main>
    )
}