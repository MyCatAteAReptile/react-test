import React from 'react';
import PostItem from './PostItem';

const PostList = ({posts, title, remove}) => {

  if (!posts.length) {
    console.log("🚀 ~ file: PostList.jsx:7 ~ PostList ~ posts.length:", posts.length)
    return (
      <h1 style={{textAlign: 'center'}}>
        Посты не найдены!
      </h1>
    )
  }

  return (
    <div>
        <h1 style={{textAlign: 'center'}}>
            {title}
        </h1>
        {posts.map((post, index) => 
            <PostItem remove={remove} number={index + 1} post={post} key={post.id}/>
        )}
    </div>
  );
};

export default PostList;