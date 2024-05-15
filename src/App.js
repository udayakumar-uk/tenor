import React from 'react';
import {BrowserRouter, Link, Routes, Router, Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Aside from './components/Aside';
import Main from './components/Main';
import Favorite from './components/Favorite';

function App() {
  // featured, categories, trending, autocomplete, search, search_suggestions, searchfilter=sticker,static, media_filter=gif,tinygif
  // "https://g.tenor.com/v1/categories?key=LIVDSRZULELA&q=wow&limit=5";

  const [inc, setInc] = React.useState(false)

  const [category, setCategory] = React.useState([]);
  const [sticker, setSticker] = React.useState([]);
  const [featured, setFeatured] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);

  const [filter, setFilter] = React.useState({
    key: 'LIVDSRZULELA',
    limit: 30,
    search: ''
  })

  React.useEffect(() => {
      fetchCategoryData();
  }, []);
  
  async function fetchCategoryData(){
    var categoryData = await fetch('https://g.tenor.com/v1/categories?key='+filter.key)
    .then(res=>res.json())
    .then(data => data.tags);
    setCategory(categoryData);
    console.log(categoryData);
  }
  
  // React.useEffect(() => {

  //   let setFavGif = featured.map(fea => ({...fea, favorite: favorites.find(fav => fea.id === fav.id)?.favorite ?? fea.favorite}))
  //   console.log(setFavGif);
  //   setFeatured(setFavGif)
    
  // }, [featured]);

  
  React.useEffect(() => {
    const fav = featured.filter(fea => fea.favorite === true);
    const getAllFav = favorites.filter(fea => fea.favorite === true)
    const setFavItems = getAllFav.concat(fav)
    setFavorites(setFavItems)
    console.log(setFavItems);
  }, [inc]);


  React.useEffect(() => {
    fetchStickerData();
    fetchFeaturedData();
  }, [filter.search]);


    async function fetchStickerData(){
      var stickerData = await fetch('https://g.tenor.com/v1/search?&searchfilter=sticker&media_filter=tinygif&q='+filter.search+'&key='+filter.key)
      .then(res=>res.json())
      .then(data => data.results);
      setSticker(stickerData);
      console.log(stickerData);
    }
    
    async function fetchFeaturedData(){
      var featuredData = await fetch('https://g.tenor.com/v1/search?key='+filter.key+'&q='+filter.search+'&limit='+filter.limit)
      .then(res=>res.json())
      .then(data => data.results);
      featuredData = featuredData.map(fea => ({ ...fea, favorite: false}));
      

      // setFeatured(featuredData);
      // console.log(featuredData);

      let setFavGif = featuredData.map(fea => ({...fea, favorite: favorites.find(fav => fea.id === fav.id)?.favorite ?? fea.favorite}))
      console.log(setFavGif);
      setFeatured(setFavGif)

      
    }

    function FavoriteClick(feature, e){ 
      setFeatured(prev => prev.map(fea => ( fea.id === feature.id ? { ...fea, favorite: !fea.favorite} : fea)));
      setInc(prev => !prev)
      // setFavorites(prev => prev.map(fea => ( fea.id === feature.id ? { ...fea, favorite: !fea.favorite} : fea)));
      e.stopPropagation();
    }


    function itemClicks(item){
      console.log(item);
    }



  function searchValue(event){
    var searchValues = event.target.value;
    if(event.keyCode == 13){
      setFilter(prev => ({...prev, search: searchValues}))
      console.log('search', filter);
    }
  }

  function categoryClick(item){
    setFilter(prev => ({...prev, search: item}))
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header searchInput={searchValue} filter={filter} favorites={favorites} />
        <section className='flex-section px-3'>

          <Aside categories={category} categoryClick={categoryClick} filter={filter} />
          <main>
            <Routes>
              <Route path='/' element={<Main filter={filter} sticker={sticker} featured={featured} itemClicks={itemClicks} FavoriteClick={FavoriteClick} />}/>
              <Route path='favorite' element={<Favorite filter={filter} favorites={favorites} itemClicks={itemClicks} FavoriteClick={FavoriteClick} />}/>
            </Routes>
          </main>
          
          
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
