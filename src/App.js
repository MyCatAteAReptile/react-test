import React, { useRef, useState } from "react";
import './styles/App.css';
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'Javascript', body: 'Description'},
    {id: 2, title: 'Javascript 2', body: 'Description'},
    {id: 3, title: 'Javascript 3', body: 'Description'}
  ])
  const [post, setPost] = useState({title: '', body: ''})

  const addNewPost = (e) => {
    e.preventDefault()
    setPosts([...posts, {...post, id: Date.now()}])
    setPost({title: '', body: ''});
  }

  return (
    <div className="App">
      <form>
        {/*Управляемый компонент - реакт управляет вэлью. У неуправляемого можно брать вэлью через useRef и атрибут ref инпута*/}
        <MyInput 
          value={post.title}
          onChange={e => setPost({...post, title: e.target.value})}
          type="text" 
          placeholder="Name"
        />
        <MyInput 
          value={post.body}
          onChange={e => setPost({...post, body: e.target.value})}
          type="text" 
          placeholder="Description"
        />
        <MyButton onClick={addNewPost}>Create</MyButton>
      </form>
      <PostList posts={posts} title='Жиес'/>
    </div>
  );
}

export default App;
