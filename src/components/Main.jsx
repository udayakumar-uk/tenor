import React from "react";
import Trending from "./Trending";


export default function Main(props){

    const [trending, setTrending] = React.useState([]);

    React.useEffect(() => {
        async function fetchTrendingData(){
          var trendingData = await fetch('https://g.tenor.com/v1/trending?key='+props.filter.key+'&limit=16')
          .then(res=>res.json())
          .then(data => data.results);
          setTrending(trendingData);
          console.log(trendingData);
        }

        if(trending.length == 0){
          fetchTrendingData();
        }
      }, [trending]);


      function TrendingSlideControl(button){
        var slider = document.getElementById('trendingSlider');
        slider.scrollBy((button == 'next' ? 500 : -500), 0)
      }

    return(
        <main>
            <Trending trending={trending} TrendingSlideControl={TrendingSlideControl} TrendingItemClick={props.categoryEvent} />
            <Featured trending={trending} FeaturedPagination={FeaturedPagination} FeaturedItemClick={props.categoryEvent} />
        </main>
    )
}