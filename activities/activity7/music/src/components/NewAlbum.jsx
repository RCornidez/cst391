import { useState } from 'react';
import dataSource from '../services/data';
import { useNavigate } from 'react-router-dom';

const NewAlbum = (props) => {
  const [albumTitle, setAlbumTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const album = {
      title: albumTitle,
      artist: artist,
      description: description,
      year: year,
      image: image,
      tracks: [],
    };

    saveAlbum(album);
  };

  const saveAlbum = async (album) => {
    const response = await dataSource.post('/albums', album);
    props.onNewAlbum(navigate);
  };

  const handleCancel = () => {
    navigate("/");
  }

  const updateTitle = (event) => {
    setAlbumTitle(event.target.value);
  };

  const updateArtist = (event) => {
    setArtist(event.target.value);
  };

  const updateDescription = (event) => {
    setDescription(event.target.value);
  };

  const updateYear = (event) => {
    setYear(event.target.value);
  };

  const updateImage = (event) => {
    setImage(event.target.value);
  };

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <h1>Create Album</h1>
        <div className="form-group">
          <label htmlFor="albumTitle">Album Title</label>
          <input type="text" className="form-control" id="albumTitle" placeholder="Enter Album Title" value={albumTitle} onChange={updateTitle} />
          <label htmlFor="albumArtist">Artist</label>
          <input type="text" className="form-control" id="albumArtist" placeholder="Enter Album Artist" value={artist} onChange={updateArtist} />
          <label htmlFor="albumDescription">Description</label>
          <textarea type="text" className="form-control" id="albumDescription" placeholder="Enter Album Description" value={description} onChange={updateDescription} />
          <label htmlFor="albumYear">Year</label>
          <input type="text" className="form-control" id="albumYear" placeholder="Enter Album Year" value={year} onChange={updateYear} />
          <label htmlFor="albumImage">Image</label>
          <input type="text" className="form-control" id="albumImage" placeholder="Enter Album Image" value={image} onChange={updateImage} />
        </div>
        <div align="center">
          <button type="button" className="btn btn-light" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default NewAlbum;