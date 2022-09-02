/* eslint-disable consistent-return */
import propTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../Styles/Favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      loading: false,
    };
    this.onClickCheckbox = this.onClickCheckbox.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true }, async () => {
      const recovered = await getFavoriteSongs();
      this.setState({
        loading: false,
        favorites: recovered,
      });
    });
  }

  async onClickCheckbox(music) {
    const { favorites } = this.state;
    if (favorites.some((song) => song.trackId === music.trackId)) {
      this.setState({ loading: true });
      await removeSong(music);
      const newFavorites = favorites
        .filter((element) => element.trackId !== music.trackId);
      return this.setState({
        loading: false,
        favorites: newFavorites,
      });
    }
  }

  render() {
    const { loading, favorites } = this.state;
    const { match } = this.props;
    return (
      <div className="page-favorites" data-testid="page-favorites">
        <Header path={match.url} />
        {loading ? (
          <Loading />
        ) : (
          <div className="favorites-container">
            {favorites.map((music) => {
              const {
                artworkUrl100, trackName, previewUrl, trackId,
              } = music;
              return (
                <div className="card-favorite" key={trackId}>
                  <div className="card-favorite-img">
                    <img
                      src={artworkUrl100}
                      alt={trackName}
                    />
                  </div>
                  <div className="card-favorite-trackname">
                    <p>{ trackName }</p>
                  </div>
                  <div className="card-favorite-track">
                    <audio data-testid="audio-component" src={previewUrl} controls>
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      <code>audio</code>
                    </audio>
                  </div>
                  <label htmlFor="isFavorite">
                    <input
                      data-testid={`checkbox-music-${trackId}`}
                      type="checkbox"
                      name="isFavorite"
                      id="isFavorite"
                      checked={favorites.some((song) => song.trackId === trackId)}
                      onChange={() => this.onClickCheckbox(music)}
                    />
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

Favorites.propTypes = {
  match: propTypes.shape({
    url: propTypes.string.isRequired,
  }).isRequired,
};

export default Favorites;
