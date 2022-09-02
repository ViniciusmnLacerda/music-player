import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonSearchIsDisabled: true,
      searchArtist: '',
      response: [],
      render: false,
      artistResearched: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.renderAlbums = this.renderAlbums.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validate);
  }

  async onClickSearch(event) {
    this.setState({ render: false });
    event.preventDefault();
    const { searchArtist } = this.state;
    const response = await searchAlbumsAPI(searchArtist);
    this.setState({
      artistResearched: searchArtist,
      searchArtist: '',
      response,
      buttonSearchIsDisabled: true,
      render: true,
    });
  }

  validate() {
    const { searchArtist } = this.state;
    const disabled = searchArtist.length < 2;
    this.setState({ buttonSearchIsDisabled: disabled });
  }

  renderAlbums() {
    const { response } = this.state;
    if (response.length === 0) {
      return (
        <p>Nenhum álbum foi encontrado</p>
      );
    }
    return (response.map((album) => (
      <div key={ album.collectionId }>
        <div>
          <Link
            to={ `/album/${album.collectionId}` }
            data-testid={ `link-to-album-${album.collectionId}` }
          >
            <img
              src={ album.artworkUrl100 }
              alt={ album.collectionName }
            />
          </Link>
        </div>
        <div>
          <p>{ album.collectionName }</p>
          <p>{ album.artistName }</p>
        </div>
      </div>
    )));
  }

  render() {
    const { buttonSearchIsDisabled, searchArtist, render, artistResearched } = this.state;
    return (
      <div data-testid="page-search">
        <div>
          <Header />
        </div>
        <div>
          <form>
            <label htmlFor="searchArtist">
              <input
                data-testid="search-artist-input"
                placeholder="Nome do Artista"
                type="text"
                name="searchArtist"
                id="searchArtist"
                onChange={ this.handleChange }
                value={ searchArtist }
              />
            </label>
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ buttonSearchIsDisabled }
              onClick={ this.onClickSearch }
            >
              Pesquisar
            </button>
          </form>
        </div>
        {render && (
          <div>
            <span>
              Resultado de álbuns de:
              {' '}
              { artistResearched }
            </span>
            { this.renderAlbums() }
          </div>)}
      </div>
    );
  }
}

export default Search;
