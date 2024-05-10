import React from "react";

export default function Trending(props){

    return(
        <section className="featured-section">
            <h2>Featured</h2>
            <ul className="flex-section">
                {/* <button className="slider-control prev-control" onClick={() => props.TrendingSlideControl('prev')} id="prev"><span className="material-symbols-rounded">chevron_left</span></button>
                <button className="slider-control next-control" onClick={() => props.TrendingSlideControl('next')} id="next"><span className="material-symbols-rounded">chevron_right</span></button> */}
                { props.featured.map((feature, index) => <li onClick={() => 
                    props.FeaturedItemClick(feature.content_description)} 
                    key={index} >
                        <span className="material-symbols-rounded favorite">favorite</span>
                        <img src={feature.media[0].tinygif.url} alt={feature.content_description} />
                        <span className="text-truncate content" title={feature.content_description}>{feature.content_description}</span>
                </li>) }
            </ul>
        </section>
    )
}