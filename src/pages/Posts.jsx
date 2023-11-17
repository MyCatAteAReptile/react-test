import React, { useEffect, useState } from "react";
import '.././styles/App.css';
import PostList from ".././components/PostList";
import { PostForm } from ".././components/PostForm";
import PostFilter from ".././components/PostFilter";
import { MyModal } from ".././components/UI/modal/MyModal";
import MyButton from ".././components/UI/button/MyButton";
import { usePosts } from ".././hooks/usePost";
import PostService from ".././API/PostService";
import Loader from ".././components/UI/Loader/Loader";
import { useFetching } from ".././hooks/useFetching";
import { getPagesCount } from ".././utils/pages";
import Pagination from ".././components/UI/pagination/Pagination";

function Posts() {
  const [posts, setPosts] = useState([] )
  const [filter, setFilter] = useState({sort: '', query:''})
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
      const responce = await PostService.getAll(limit, page)
      setPosts(responce.data)
      const totalCount = responce.headers['x-total-count']
      setTotalPages(getPagesCount(totalCount, limit))
    }
  )
  
  useEffect(() => {
    fetchPosts(limit, page);
  }, [])  //сюда можно записать page, вместо того чтобы делать changePage, тогда запрос списка постов будет происходить когда надо (но я запишу другой вариант)
          //нужно учитывать что изменение состояния это асинхронный процесс
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
  }

  return (
    <div className="App">
      <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter 
        filter={filter}
        setFilter={setFilter}
      />
      {}
      {
        isPostsLoading
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Posts'/>
      }
      <Pagination
        totalPages={totalPages}
        page={page}
        changePage={changePage}
      />
    </div>
  );
}

export default Posts;
