import React from "react";
import Trending from "./Trending";
import Featured from "./Featured";


export default function Main(props){
  
    // const [oneTime, setOneTime] = React.useState(0);
    const [trending, setTrending] = React.useState([]);
    const [featured, setFeatured] = React.useState([]);

    React.useEffect(() => {
        
        // if(oneTime === 0){
          fetchTrendingData();
          fetchFeaturedData();
          AddFavoriteObj();
          // setOneTime(1);
        // }


      }, []);


      async function fetchTrendingData(){
        var trendingData = await fetch('https://g.tenor.com/v1/trending?&key='+props.filter.key)
        .then(res=>res.json())
        .then(data => data.results);
        setTrending(trendingData);
        console.log(trendingData);
      }
      
      async function fetchFeaturedData(){
        var featuredData = await fetch('https://g.tenor.com/v1/featured?key='+props.filter.key+'&limit='+props.filter.limit)
        .then(res=>res.json())
        .then(data => data.results);
        setFeatured(featuredData);
        console.log(featuredData);
      }



      function TrendingSlideControl(button){
        var slider = document.getElementById('trendingSlider');
        slider.scrollBy((button == 'next' ? 500 : -500), 0)
      }

      function AddFavoriteObj(){
        // console.log(oneTime);
        // if(!oneTime){
          setFeatured(prev => (
            prev.map(fea => ({ ...fea, favorite: false }))
          ));
        // }
      }



    return(
        <main>
            <Trending trending={trending} TrendingSlideControl={TrendingSlideControl} TrendingItemClick={props.categoryEvent} />
            <Featured featured={featured} FeaturedItemClick={props.categoryEvent} />
            {/* FeaturedPagination={FeaturedPagination} */}
        </main>
    )
}