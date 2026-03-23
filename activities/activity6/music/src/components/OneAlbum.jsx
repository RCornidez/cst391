import { useParams } from 'react-router-dom';

const OneAlbum = (props) => {
    const { albumId } = useParams();
    const album = props.albumList.find((a) => a.albumId == albumId);

    if (!album) return <div className='container'><p>No Album Found</p></div>;

    return (
        <div className='container'>
            <h2>Album Details for {album.title}</h2>
            <div className='row'>
                <div className='col col-sm-3'>
                    <div className='card'>
                        <img src={album.image} className='card-img-top' alt={album.title}/>
                        <div className='card-body'>
                            <h5 className='card-title'>{album.title}</h5>
                            <p className='card-text'>{album.description}</p>
                            <div className='list-group'>
                                <li>Show the album's tracks here</li>
                            </div>
                            <a href='/#' className='btn btn-primary'>
                                Edit
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OneAlbum;