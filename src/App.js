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

  // const [search, setSearch] = React.useState('')
  const [category, setCategory] = React.useState([])
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

  function searchValue(event){
    var searchValues = event.target.value;
    if(event.keyCode == 13){
      setFilter(prev => ({...prev, search: searchValues}))
      console.log('search', filter);
    }
  }

  function categoryClick(item){
    setFilter(prev => ({...prev, search: item}))
    // var search = document.getElementById('search');
    // search.value = item
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Header searchInput={searchValue} filter={filter} />
        <section className='flex-section px-3'>

          <Aside categories={category} categoryClick={categoryClick} filter={filter} />
          <Routes>
            <Route path='/' element={<Main filter={filter} />}/>
            <Route path='favorite' element={<Favorite />}/>
          </Routes>
          
          
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
