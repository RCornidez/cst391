import { useState } from 'react';
import Post from './components/Post';
import AddPost from './components/AddPost';

function App() {
  const [postId, setPostId] = useState(3)
  const [postList, setPostList] = useState([
    {
      postNumber: 0,
      text: 'a short psychic broke out of jail. She was a small medium at large.'
    },
    {
      postNumber: 1,
      text: 'More interesting reading if only I had more time.'
    },
    {
      postNumber: 2,
      text: 'Third blog post. I have run out of ideas. Please comment below.'
    }
  ])

  const handleDeletePost = (id) => {
    let updatedPostList = postList.filter(post => post.postNumber !== id);
    setPostList(updatedPostList);
  }

  const handleAddPost = (newText) => {
    let newPost = {
      postNumber: postId,
      text: newText
    };

    setPostList(postList => [...postList, newPost]);
    setPostId(postId+1)
  }


  const posts = postList.map((post) => (
      <Post key={post.postNumber} text={post.text} id={post.postNumber} onDelete={() => handleDeletePost(post.postNumber)}/>
    ));
  return (
    <>
      {posts}
      <AddPost onAdd={handleAddPost}/>
    </>
  )
}

export default App
