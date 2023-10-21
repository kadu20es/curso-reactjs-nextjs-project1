import { useCallback, useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Posts } from '../../components/Posts';
import { SearchField } from '../../components/SearchField';
import { loadPosts } from '../../utils/load-posts';
import './styles.css';

export const Home = () => {
  const [ posts, setPosts ] = useState([]);
  const [ allPosts, setAllPosts ] = useState([]);
  const [ page, setPage ] = useState(0);
  const [ postsPerPage ] = useState(4);
  const [ searchValue, setSearchValue ] = useState('');

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));// paginação
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => { // substitui o willMount, didMount e didUpdate
     console.log('oi');
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => { // paginação
    // a próxima página recebe a página atual + 2 (postsperPage = 2)
    const nextPage = page + postsPerPage;
    // próximos posts recebe todos os posts, passando o valor de nextPage + 2 (postsPerPage = 2)
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  }

  const noMorePosts = page + postsPerPage >= allPosts.length;
  // eslint-disable-next-line no-extra-boolean-cast
  const filteredPosts = !!searchValue ? allPosts.filter(post => {

    /* se tem algum valor no searchValue, vamos filtrar os posts
    retornando todos os posts que contém o mesmo valor do searchValue,
    se não tiver, retorna os posts normais
    */
    return post
      .title
      .toLowerCase()
      .includes(searchValue.toLowerCase());
  }) : posts;


  return (
    <section className="container">
      <div className="search-container">

        {!!searchValue && (
          <h1>Search value: {searchValue}</h1>
        )}

        <SearchField searchValue={searchValue} handleChange={handleChange} />

      </div>


      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts}/>
      )}

      {filteredPosts.length === 0 && (
        <p>There's no posts with {searchValue} word</p>
      )}

      <div className="button-container">
        {!searchValue && (
          <Button
            text="Load more posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>

  );
}

/*

*/