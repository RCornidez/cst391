import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const OneAlbum = (props) => {
    const [selectedTrack, setSelectedTrack] = useState(null);

    const { albumId } = useParams();
    const navigate = useNavigate();
    const album = props.albumList.find((a) => a.albumId == albumId);


    if (!album) return <div className='container'><p>No Album Found</p></div>;

    const tracks = album.tracks?.map((track, index) => (
    <li key={index} onClick={() => setSelectedTrack(track)} style={{ cursor: 'pointer' }}>
        {track.title}
    </li>
    ));

    
    return (
        <div className='container'>
            <h2>Album Details for {album.title}</h2>
            <div className='row'>
                <div className='col col-sm-5'>
                    <div className='card'>
                        <img src={album.image} className='card-img-top' alt={album.title}/>
                        <div className='card-body'>
                            <h5 className='card-title'>{album.title}</h5>
                            <p className='card-text'>{album.description}</p>
                            <div className='list-group'>
                                {tracks}
                            </div>
                            <button className='btn btn-primary' onClick={() => navigate(`/edit/${albumId}`)}>                       
                                Edit
                            </button>      
                        </div>
                    </div>
                </div>
                <div className='col col-sm-5'>
                    {selectedTrack ? (
                        <>
                            <h4>{selectedTrack.title}</h4>
                            <p>{selectedTrack.lyrics == null ? "Lyrics are null" : selectedTrack.lyrics}</p>
                        </>
                    ) : (
                        <p>Select a track to see its lyrics</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OneAlbum;