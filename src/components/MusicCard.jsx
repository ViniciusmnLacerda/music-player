import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorites: [],
    };
    this.onClickCheckbox = this.onClickCheckbox.bind(this);
  }

  async componentDidMount() {
    const recovered = await getFavoriteSongs();
    this.setState({ favorites: recovered });
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
    this.setState({ loading: true }, async () => {
      await addSong(music);
      this.setState({
        loading: false,
        favorites: [...favorites, music],
      });
    });
  }

  render() {
    const { musics } = this.props;
    const { loading, favorites } = this.state;
    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <ul>
            {musics.map((music) => {
              const { trackName, trackId, previewUrl } = music;
              return (
                <li key={ trackId }>
                  <p>{ trackName }</p>
                  <audio data-testid="audio-component" src={ previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    <code>audio</code>
                  </audio>
                  <label htmlFor="isFavorite">
                    Favorita
                    <input
                      data-testid={ `checkbox-music-${trackId}` }
                      type="checkbox"
                      name="isFavorite"
                      id="isFavorite"
                      checked={ favorites.some((song) => song.trackId === trackId) }
                      onChange={ () => this.onClickCheckbox(music) }
                    />
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(
    PropTypes.shape({
      artistId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default MusicCard;
