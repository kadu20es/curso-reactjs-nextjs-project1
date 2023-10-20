import { Component } from 'react';
import { Button } from '../../components/Button';
import { Posts } from '../../components/Posts';
import { SearchField } from '../../components/SearchField';
import { loadPosts } from '../../utils/load-posts';
import './styles.css';

class Home extends Component {
  state = {
    posts: [], // paginação
    allPosts: [],
    page: 0, // paginação
    postsPerPage: 6, // paginação
    searchValue: '',
  };

  componentDidMount() {
    this.loadposts();
  }

  loadposts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage), // paginação
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () => { // paginação
    const {
      page,
      postsPerPage,
      allPosts,
      posts,
    } = this.state;

    // a próxima página recebe a página atual + 2 (postsperPage = 2)
    const nextPage = page + postsPerPage;
    // próximos posts recebe todos os posts, passando o valor de nextPage + 2 (postsPerPage = 2)
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);
    console.log(allPosts);
    this.setState({ posts, page: nextPage })

    console.log(page, postsPerPage, nextPage, nextPage + postsPerPage);

  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
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
        .includes(searchValue.toLocaleLowerCase());
    }) : posts;

    return (
      <section className="container">
        <div className="search-container">

          {!!searchValue && (
            <h1>Search value: {searchValue}</h1>
          )}

          <SearchField searchValue={searchValue} handleChange={this.handleChange} />

        </div>


        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts}/>
        )}

        {filteredPosts.length === 0 && (
          <p>There's no posts with {searchValue} word</p>
        )}

        <div className="button-container">
          <Button
            text="Load more posts"
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
          />
        </div>
      </section>

    );
  }
}

export default Home;
