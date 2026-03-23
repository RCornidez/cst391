import SearchForm from "./SearchForm";
import AlbumList from "./AlbumList";

const SearchAlbum = (props) => {
    return (
        <>
            <SearchForm onSubmit = {props.updateSearchResults}/>
            <AlbumList albumList={props.albumList} onClick={props.updateSingleAlbum}/>
        </>
    );
};

export default SearchAlbum;
