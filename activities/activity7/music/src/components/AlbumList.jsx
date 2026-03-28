import Card from "./Card";
import { useNavigate } from "react-router-dom";

const AlbumList = (props) => {

    const handleSelection = (albumId, uri) => {
        props.onClick(albumId, navigator, uri);
    };

    const navigator = useNavigate();
    const albums = props.albumList.map((album) =>{
        return album.show ? (
            <Card
              key = {album.albumId}
              albumId = {album.albumId}
              albumTitle={album.title}
              albumDescription={album.description}
              buttonText="OK"
              imageURL={album.image}
              onClick={handleSelection}
            />
          ) : null;
    });
    return <div className='container'>{albums}</div>
};

export default AlbumList;