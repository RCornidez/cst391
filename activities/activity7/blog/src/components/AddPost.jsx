import { useState } from "react";


function AddPost (props) {
    const [text, setText] = useState('');

    const updateText = (event) => {
        setText(event.target.value);
    }

    return (
        <div className="post-container">
            <textarea onChange={updateText} type='text' value={text}/>
            <br/>
            <button onClick={() => props.onAdd(text)}>Add</button>
        </div>
    )
}

export default AddPost;