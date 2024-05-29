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

  const [inc, setInc] = React.useState(false)

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
  

  
  React.useEffect(() => {
    const getAllFavFromFea = featured.filter(fea => fea.favorite === true);
    const getAllFavFromFav = favorites.filter(fea => fea.favorite === true)
    const getAllFavFromSticker = stickers.filter(fea => fea.favorite === true);
    // const setFavItems = getAllFav.concat(fav)
    const setFavItems = [...getAllFavFromFea, ...getAllFavFromFav, ...getAllFavFromSticker]
    const removeDupItem = [...new Set(setFavItems)]
    setFavorites(removeDupItem);
    console.log(removeDupItem);
  }, [inc]);


  React.useEffect(() => {
    fetchStickerData();
    fetchFeaturedData();
  }, [filter.limit, filter.search]);


    async function fetchStickerData(){
      var stickerData = await fetch('https://g.tenor.com/v1/search?&searchfilter=sticker&q='+filter.search+'&limit='+filter.limit+'&key='+filter.key)
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
      let setFavGif = featuredData.map(fea => ({...fea, favorite: favorites.find(fav => fea.id === fav.id)?.favorite ?? fea.favorite}))
      console.log(setFavGif);
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
      setModal(prev => ({...prev, showModal: true, item: item, type: 'gif', dims: item.media[0].gif.dims, size: convertToFileSize(item.media[0].gif.size)}))
    }

    function closeModal(){
      setModal(prev => ({...prev, showModal: false}))
    }

    function closeBackdropModal(e){
      if(e.target.className.includes('modal-wrapper')){
        setModal(prev => ({...prev, showModal: false}))
      }
      e.stopPropagation();
    }

    function gifType(type, e){
      console.log(type);
      if(type === '_transparent'){
        setModal(prev => ({...prev, transparentType: e.target.checked ? type : ''}))
      }else{
        setModal(prev => ({...prev, transparentType: '', type: type, transparent: type === 'webp' || type === 'tinygif' || type === 'nanogif'}))
        
        // unchecking 
        const transCheckbox = document.getElementById('transparent');
        if(type){
          transCheckbox.checked = false
        }
      }
    }

    // function gifTrans(trans, e){
    //   console.log(e.target.value);
    //   setModal(prev => ({...prev, type: (trans === '_transparent' ? modal.type + '_transparent' : type)}))
    // }


  function searchValue(searchTerm){
    setFilter(prev => ({...prev, search: searchTerm}))
    console.log('search', filter);
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

  return (
    <div className="App">
      <BrowserRouter>
        <Header searchInput={searchValue} filter={filter} favorites={favorites} categoryClick={categoryClick} favClick={favClick} />
        <section className='flex-section px-3'>

          <Aside categories={category} categoryClick={categoryClick} filter={filter} />
          <main>

          <Modal modalItem={modal.item} open={modal.showModal} type={modal.type} url={modal.url} transparent={modal.transparent} transparentType={modal.transparentType} dims={modal.dims} size={modal.size} modalTrigger={{closeModal, closeBackdropModal, gifType, convertToFileSize}} />

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
