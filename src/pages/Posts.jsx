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
import { useRef } from "react";
import { useObserver } from "../hooks/useObserver";
import { MySelect } from "../components/UI/select/MySelect";

function Posts() {
  const [posts, setPosts] = useState([] )
  const [filter, setFilter] = useState({sort: '', query:''})
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const lastElement = useRef()

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
      const responce = await PostService.getAll(limit, page)
      setPosts([...posts, ...responce.data])
      const totalCount = responce.headers['x-total-count']
      setTotalPages(getPagesCount(totalCount, limit))
    }
  )

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1)
  })
  
  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit])  //сюда можно записать page, вместо того чтобы делать changePage, тогда запрос списка постов будет происходить когда надо (но я запишу другой вариант)
          //нужно учитывать что изменение состояния это асинхронный процесс
          // а в конце, когда мы начали делать бесконечную ленту, наоброт поставили тут page и убрали fetch в changePage
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
    //fetchPosts(limit, page)
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

      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Количество элементов на странице"
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'Все'},
        ]}
      />

      <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Posts'/>

      <div ref={lastElement} style={{height: 20, background: 'red'}}/>

      {isPostsLoading && 
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
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
