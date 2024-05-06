import React from "react";

export default function Trending(props){

    return(
        <section className="trending-section">
            <h2>Trending</h2>
            <ul className="flex-section scrollbar" id="trendingSlider">
                <button className="slider-control prev-control" onClick={() => props.TrendingSlideControl('prev')} id="prev"><span className="material-symbols-rounded">chevron_left</span></button>
                <button className="slider-control next-control" onClick={() => props.TrendingSlideControl('next')} id="next"><span className="material-symbols-rounded">chevron_right</span></button>
                { props.trending.map((trend, index) => <li onClick={() => props.TrendingItemClick(trend.content_description)} id={`slider${index}`} className="drag" 
                    key={index} 
                    style={{
                        background: `linear-gradient(1deg, #000000ad 20%, #0000000f 80%), url(${trend.media[0].tinygif.url})`
                    }} >
                        {trend.content_description}
                </li>) }
            </ul>
        </section>
    )
}