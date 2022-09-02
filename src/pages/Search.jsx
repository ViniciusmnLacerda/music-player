import propTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../Styles/Search.css';

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
        <p className="failed-request">No albums found.</p>
      );
    }
    return (response.map((album) => (
      <div className="album-card" key={album.collectionId}>
        <div className="card-img">
          <Link
            to={`/album/${album.collectionId}`}
            data-testid={`link-to-album-${album.collectionId}`}
          >
            <img
              src={album.artworkUrl100}
              alt={album.collectionName}
            />
          </Link>
        </div>
        <div className="card-content">
          <p className="card-collection">{ album.collectionName }</p>
          <p className="card-name">{ album.artistName }</p>
        </div>
      </div>
    )));
  }

  render() {
    const {
      buttonSearchIsDisabled, searchArtist, render, artistResearched,
    } = this.state;
    const { match } = this.props;
    return (
      <div className="search-container" data-testid="page-search">
        <Header path={match.url} />
        <div className="search-content">
          <form className="search-form">
            <label htmlFor="searchArtist">
              <input
                data-testid="search-artist-input"
                placeholder="Artist Name"
                type="text"
                name="searchArtist"
                id="searchArtist"
                onChange={this.handleChange}
                value={searchArtist}
              />
              <button
                type="submit"
                data-testid="search-artist-button"
                disabled={buttonSearchIsDisabled}
                onClick={this.onClickSearch}
              >
                Search
              </button>
            </label>
          </form>
          <div className="albuns-container">
            {render && (
            <div className="albuns-cards-container">
              <span>
                { artistResearched }
              </span>
              <div className="cards-container">
                { this.renderAlbums() }
              </div>
            </div>

            )}
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  match: propTypes.shape({
    url: propTypes.string.isRequired,
  }).isRequired,
};

export default Search;
