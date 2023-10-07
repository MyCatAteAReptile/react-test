import React, { useState } from 'react'
import MyInput from './UI/input/MyInput'
import MyButton from './UI/button/MyButton'

export const PostForm = ({create}) => {
    const [post, setPost] = useState({title: '', body: ''})
    
    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({title: '', body: ''});
    }

    return (
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
    )
}
