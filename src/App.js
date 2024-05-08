import './App.css';
import Header from './components/Header';
import Aside from './components/Aside';
import Main from './components/Main';
import React from 'react';

function App() {
  // featured, categories, trending, autocomplete, search, search_suggestions, searchfilter=sticker,static, media_filter=gif,tinygif
  // "https://g.tenor.com/v1/categories?key=LIVDSRZULELA&q=wow&limit=5";

  const [search, setSearch] = React.useState('')
  const [category, setCategory] = React.useState([])
  const [filter, setFilter] = React.useState({
    key: 'LIVDSRZULELA',
    limit: 30
  })

  React.useEffect(() => {
    async function fetchCategoryData(){
      var categoryData = await fetch('https://g.tenor.com/v1/categories?key='+filter.key)
      .then(res=>res.json())
      .then(data => data.tags);
      setCategory(categoryData);
      console.log(categoryData);
    }
    if(category.length == 0){
      fetchCategoryData();
    }
  }, []);


  function searchValue(event){
    var searchValues = event.target.value;
    if(event.keyCode == 13){
      setSearch(searchValues)
      console.log('search', search)
    }
  }

  function categoryClick(item){
    alert(item)
  }


  return (
    <div className="App">
      <Header searchInput={() => searchValue} />
      <section className='flex-section px-3'>
        <Aside categories={category} categoryEvent={categoryClick} />
        <Main filter={filter} categoryEvent={categoryClick} />
      </section>
    </div>
  );
}

export default App;
