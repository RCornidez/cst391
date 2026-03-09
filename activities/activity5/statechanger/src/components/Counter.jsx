import { useState } from "react";
import "./counter.css";

const Counter = (props) => {
    const [clicks, setClicks] = useState(0);
    const [message, setMessage] = useState(props.title);

    const addOneClick = () => {
        setClicks(clicks + 1);
    };

    const handleNewMessage = (event) => {
        setMessage(event.target.value);
    };

    return (
        <div className="one-box">
            <h1>{props.title}</h1>
            <h2>clicks: {clicks}</h2>
            <h3>message: {message}</h3>
            <input
                type="text"
                value={message}
                onChange={handleNewMessage}
            />

            <button onClick={addOneClick}>Click Me</button>
        </div>
    );
};

export default Counter;