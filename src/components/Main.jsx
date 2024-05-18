import React from "react";
import Sticker from "./Sticker";
import Featured from "./Featured";


export default function Main({filter, sticker, featured, itemClicks, favTrigger, loadMore}){
  
      function StickerSlideControl(button){
        var slider = document.getElementById('stickerSlider');
        slider.scrollBy((button == 'next' ? 500 : -500), 0)
      }
    
      // function mainFavoriteClick(feature, e){ 
      //   FavoriteClick(feature, e)
      // }

    return(
        <>
            <Sticker sticker={sticker} StickerSlideControl={StickerSlideControl} stickerItemClick={itemClicks} filter={filter} />
            <Featured title="Featured" featured={featured} FeaturedItemClick={itemClicks} favTrigger={favTrigger} filter={filter} loadMore={loadMore} />
            {/* FeaturedPagination={FeaturedPagination} */}
        </>
    )
}