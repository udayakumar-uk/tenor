import React from "react";
import {Link} from "react-router-dom";
import Loading from '../img/loading.svg'

export default function Sticker(props){

    const [load, setLoad] = React.useState(false)

    React.useEffect(() => {
        setLoad(true);

        setTimeout(function(){
            setLoad(false)
        }, 700)

        console.log(props.SearchImg);

    }, [props.SearchImg])
    
    return(
        <section className="sticker-section">
            <div className="titleNav">
                <h2>Stickers</h2>
                <Link to="stickers">See All</Link>
            </div>
            <ul className="flex-section scrollbar" id="stickerSlider">
                <button className="slider-control prev-control" onClick={() => props.StickerSlideControl('prev')} id="prev"><span className="material-symbols-rounded">chevron_left</span></button>
                <button className="slider-control next-control" onClick={() => props.StickerSlideControl('next')} id="next"><span className="material-symbols-rounded">chevron_right</span></button>
                { props.sticker.map((stick, index) => <li onClick={() => props.stickerItemClick(stick.content_description)} id={`slider${index}`} className="drag" 
                    key={index} 
                    style={{
                        backgroundImage: `linear-gradient(1deg, #000000ad 20%, #0000000f 80%), url(${load ? Loading : stick.media[0].tinygif.url})`
                    }} >
                        {stick.content_description}
                </li>) }
            </ul>
        </section>
    )
}