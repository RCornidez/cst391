import { useParams } from "react-router-dom";

const User = (props) => {
    let { username } = useParams();
    
    return (
        <>
            <h2>Hello {username}</h2>
        </>
    )
};

export default User;