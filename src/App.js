import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import InfiniteScroll from 'react-infinite-scroll-component'
import './App.css';
const accessKey = 'B9kQstTBtUHeXXy7KkqBMYxz8nAJxnXBZ6ZHktFqbpM'
const UNSPLASH_URL = `https://api.unsplash.com/photos?client_id=${accessKey}`
function App() {
  const [imageData, setImageData] = useState([]) 
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')



  const getPhoto = () => {
    const url = query ? `https://api.unsplash.com/search/photos?client_id=${accessKey}&page=${page}&query=${query}` : `${UNSPLASH_URL}&page=${page}`
    
    console.log(url)
          
    try {

          fetch(url)
            .then(response=>response.json())
            .then(result=>{
              const imgApi = result.results ?? result
              console.log(imgApi)
              if(page===1) setImageData(imgApi)
              setImageData((imageData)=>[...imageData,...imgApi])
            })
    } catch (error) {
      console.log(error)
    }
  }
  const searchPhoto =(e)=> {
    e.preventDefault()
    setPage(1);
    getPhoto()
  }
  useEffect(()=>{
    getPhoto()
  },[page])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={searchPhoto}>
        <input type="text" value={query} onChange={e=>setQuery(e.target.value)}/>
        </form>
      <InfiniteScroll
        dataLength={imageData.length}
        next={()=>{setPage(page=>page+1)}}
        hasMore={true}
        loader={<h3>Loading...</h3>}
      >
            <div className="image-grid" style={{width: 754+'px'}}>
                {imageData.map((item,index)=>{
                
                  return (
                    <a 
                      className='image' 
                      href={item.links.html}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                        <img src={item.urls.regular}/>
                    </a>
                  )
                })}
            </div>
      </InfiniteScroll>
        
      </header>
    </div>
  );
}

export default App;
