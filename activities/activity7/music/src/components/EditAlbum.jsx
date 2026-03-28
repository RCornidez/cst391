import { useState } from 'react';
import data from '../services/data';
import { useNavigate, useParams } from 'react-router-dom';


function EditAlbum (props) {

    const { albumId } = useParams();
    let album = props.albumList.find((a) => a.albumId == albumId) || {
		title: '',
		artist: '',
		description: '',
		year: '',
		image: '',
		tracks: [],
	};

    let newAlbum = !album.albumId;

	const [albumTitle, setAlbumTitle] = useState(album.title);
	const [artist, setArtist] = useState(album.artist);
	const [description, setDescription] = useState(album.description);
	const [year, setYear] = useState(album.year);
	const [image, setImage] = useState(album.image);


	const navigate = useNavigate();

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

	const handleFormSubmit = (event) => {
		event.preventDefault();

		const editedAlbum = {
			albumId: album.albumId,
			title: albumTitle,
			artist: artist,
			description: description,
			year: year,
			image: image,
			tracks: album.tracks,
		};
        
		saveAlbum(editedAlbum);
	};

	const saveAlbum = async (album) => {
		let response;
		if (newAlbum)
			response = await data.post('/albums', album);
		else
			response = await data.put('/albums', album);
		props.onEditAlbum(navigate);
	};

	const handleCancel = () => {
		navigate("/")
	}



	return (
		<div className='container'>
			<form onSubmit={handleFormSubmit}>
				<h1>{newAlbum ? "Create New" : "Edit"}  Album</h1>
				<div className="form-group">
					<label htmlFor="albumTitle">Album Title</label>
					<input type="text" className="form-control" id="albumTitle" placeholder="Album Title" value={albumTitle} onChange={updateTitle} />
					<label htmlFor="albumArtist">Artist</label>
					<input type="text" className="form-control" id="albumArtist" placeholder="Artist" value={artist} onChange={updateArtist} />
					<label htmlFor="albumDescription">Description</label>
					<input type="text" className="form-control" id="albumDescription" placeholder="Description" value={description} onChange={updateDescription} />
					<label htmlFor="albumYear">Year</label>
					<input type="text" className="form-control" id="albumYear" placeholder="Album Year" value={year} onChange={updateYear} />
					<label htmlFor="albumImage">Image</label>
					<input type="text" className="form-control" id="albumImage" placeholder="Album Image" value={image} onChange={updateImage} />
				</div>
				<div style={{ margin: 10 }}>
					<button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
					<button type="submit" className="btn btn-warning">Submit</button>
				</div>
			</form>
		</div>
	);
};

export default EditAlbum;