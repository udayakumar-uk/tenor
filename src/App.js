import React from 'react';
import {BrowserRouter, Link, Routes, useNavigate, Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Aside from './components/Aside';
import Main from './components/Main';
import Featured from './components/Featured';
import Modal from './components/Modal';

function App() {
  // featured, categories, trending, autocomplete, search, search_suggestions, searchfilter=sticker,static, media_filter=gif,tinygif
  // "https://g.tenor.com/v1/categories?key=LIVDSRZULELA&q=wow&limit=5";

  const [inc, setInc] = React.useState(false);
  const [localDate, setLocalDate] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  
  const [sidebar, setSidebar] = React.useState(false);
  const [category, setCategory] = React.useState([]);
  const [stickers, setSticker] = React.useState([]);
  const [featured, setFeatured] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [modal, setModal] = React.useState({
    showModal: false,
    item: null,
    dims: null,
    size: null,
    type: null,
    sticker: false,
    transparentType: '',
    transparent: false,
    url: ''
  });

  const [filter, setFilter] = React.useState({
    key: 'LIVDSRZULELA',
    limit: 30,
    search: '',
    pagination: false
  })


  if(localDate){
    setLocalDate(false);
    let getLocalStr = window.localStorage.getItem('favorites') ?? '[]';
    let FavParse = JSON.parse(getLocalStr);


    let getDarkMode = window.localStorage.getItem('darkMode') ?? 'false';
    let darkModeParse = JSON.parse(getDarkMode);

    setDarkMode(darkModeParse);
    setFavorites(FavParse);
  }



  React.useEffect(() => {
    window.localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);


  React.useEffect(() => {
      fetchCategoryData();
  }, []);
  
  async function fetchCategoryData(){
    var categoryData = await fetch('https://g.tenor.com/v1/categories?key='+filter.key)
    .then(res=>res.json())
    .then(data => data.tags);
    setCategory(categoryData);
    console.log('category:', categoryData);
  }
  

  
  React.useEffect(() => {
    const getAllFavFromFea = featured.filter(fea => fea.favorite === true);
    const getAllFavFromFav = favorites.filter(fea => fea.favorite === true)
    const getAllFavFromSticker = stickers.filter(fea => fea.favorite === true);
    // const setFavItems = getAllFav.concat(fav)
    const setFavItems = [...getAllFavFromFea, ...getAllFavFromFav, ...getAllFavFromSticker]
    const removeDupItem = [...new Set(setFavItems)]
    setFavorites(removeDupItem);

    window.localStorage.setItem('favorites', JSON.stringify(removeDupItem));

    console.log("Fav :", removeDupItem);
  }, [inc]);


  React.useEffect(() => {
    fetchStickerData();
    fetchFeaturedData();
  }, [filter.limit, filter.search]);


    async function fetchStickerData(){
      var stickerData = await fetch('https://g.tenor.com/v1/search?&searchfilter=sticker&q='+filter.search+'&limit='+filter.limit+'&key='+filter.key)
      .then(res=>res.json())
      .then(data => data.results);
      stickerData = stickerData.map(fea => ({ ...fea, sticker: true}));
      setSticker(stickerData);
      console.log("Sticker : ", stickerData);
    }
    
    async function fetchFeaturedData(){
      var featuredData = await fetch('https://g.tenor.com/v1/search?key='+filter.key+'&q='+filter.search+'&limit='+filter.limit)
      .then(res=>res.json())
      .then(data => data.results);
      featuredData = featuredData.map(fea => ({ ...fea, favorite: false, sticker: false}));
      let setFavGif = featuredData.map(fea => ({...fea, favorite: favorites.find(fav => fea.id === fav.id)?.favorite ?? fea.favorite}))
      console.log("Featured : ", setFavGif);
      setFeatured(setFavGif);
      
    }

    function FavoriteClick(feature, e){ 
      setFeatured(prev => prev.map(fea => ( fea.id === feature.id ? { ...fea, favorite: !fea.favorite} : fea)));
      setFavorites(prev => prev.map(fea => ( fea.id === feature.id ? { ...fea, favorite: !fea.favorite} : fea)));
      setSticker(prev => prev.map(fea => ( fea.id === feature.id ? { ...fea, favorite: !fea.favorite} : fea)));
      setInc(prev => !prev);
      e.stopPropagation();
    }

    function convertToFileSize(size) {
      var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
      return +((size / Math.pow(1024, i)).toFixed(2)) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    }

    function itemClicks(item){
      console.log(item);
      setModal(prev => ({...prev, showModal: true, sticker: item.sticker, item: item, type: 'gif', dims: item.media[0].gif.dims, size: convertToFileSize(item.media[0].gif.size)}))
    }

    function closeModal(){
      setModal(prev => ({...prev, showModal: false, sticker:false, type: 'gif', transparent: false, transparentType: ''}))
    }

    function closeBackdropModal(e){
      if(e.target.className.includes('modal-wrapper')){
        setModal(prev => ({...prev, showModal: false, sticker:false, type: 'gif', transparent: false, transparentType: ''}))
      }
      e.stopPropagation();
    }

    function gifType(type, e){
      if(type === '_transparent'){
        setModal(prev => ({...prev, transparentType: e.target.checked ? type : ''}))
      }else{
        setModal(prev => ({...prev, transparentType: '', type: type, transparent: type === 'webp' || type === 'tinygif' || type === 'nanogif'}))
        
        // unchecking 
        const transCheckbox = document.getElementById('transparent');
        if(type && transCheckbox){
          transCheckbox.checked = false
        }
      }
    }

  function searchValue(searchTerm){
    setFilter(prev => ({...prev, search: searchTerm, limit: 30}))
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  function categoryClick(categoryTerm){
    setFilter(prev => ({...prev, pagination: true, search: categoryTerm, limit: 30}))
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  function loadMore(count){
    if(filter.limit !== 50){
      setFilter(prev => ({ ...prev, limit: prev.limit + count }));
    }
  }

  function seeAllClick(){
    setFilter(prev => ({ ...prev, limit: 30}));
  }

  function favClick(){
    setFilter(prev => ({ ...prev, pagination: false }));
  }

  function openSidebar(e){
    if(e && e.target.className.includes('open-sidebar')){
      setSidebar(false);
    }else{
      setSidebar(true);
    }
  }


  function setDarkModeEvent(){
    setDarkMode(prev => !prev);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header searchInput={searchValue} filter={filter} favorites={favorites} categoryClick={categoryClick} favClick={favClick} openSidebar={openSidebar} setDarkModeEvent={setDarkModeEvent} darkMode={darkMode} />
        <section className="flex-section px-3">
          <div className={`aside-wrapper ${sidebar ? 'open-sidebar' : ''}`} onClick={openSidebar} >
            <Aside categories={category} categoryClick={categoryClick} filter={filter}  />
          </div>
          
          <main>

          <Modal modalItem={modal.item} open={modal.showModal} type={modal.type} modal={{ ...modal }} modalTrigger={{closeModal, closeBackdropModal, gifType, convertToFileSize}} />

            <Routes>
              <Route path='/' element={<Main loadMore={loadMore} filter={filter} sticker={stickers} featured={featured} itemClicks={itemClicks} favTrigger={FavoriteClick} seeAllClick={seeAllClick} />}/>
              <Route path='favorites' element={<Featured filter={filter} title="Favorite" featured={favorites} FeaturedItemClick={itemClicks} favTrigger={FavoriteClick} />}/>
              <Route path='stickers' element={<Featured loadMore={loadMore} filter={filter} title="Stickers" featured={stickers} FeaturedItemClick={itemClicks} favTrigger={FavoriteClick} />}/>
            </Routes>
          </main>
          
          
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
