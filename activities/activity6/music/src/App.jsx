
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SearchAlbum from './components/SearchAlbum';
import NavBar from './components/NavBar';
import NewAlbum from './components/NewAlbum';
import OneAlbum from './components/OneAlbum';

import data from './services/data';
import './App.css'

function App() {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [albumList, setAlbumList] = useState([]);
  let refresh = false;

  const renderedList = () => {
    return albumList.map((album) => ({
      ...album,
      show: album.description.toLowerCase().includes(searchPhrase.toLowerCase()) || searchPhrase === '',
    }));
  };

  const updateSearchResults = (phrase) => {
    console.log('phrase is ' + phrase);
    setSearchPhrase(phrase);
  };

  const loadAlbums = async () => {
    const response = await data.get('/albums');

    setAlbumList(response.data)
  }

  const updateSingleAlbum = (id, navigate) => {
    navigate('/show/' + id);
  };


  useEffect(() => {loadAlbums()}, [refresh])

  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route exact path='/' element={
            <SearchAlbum
              updateSearchResults={updateSearchResults}
              albumList={renderedList()}
              updateSingleAlbum={updateSingleAlbum}
            />
          }
          />
          <Route exact path='/new' element={<NewAlbum />}/>
          <Route exact path='/show/:albumId' element={<OneAlbum albumList={albumList} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
