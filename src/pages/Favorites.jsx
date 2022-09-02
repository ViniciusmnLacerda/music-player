import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

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
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div>
            <p>Músicas Favoritas</p>
            <div>
              <ul>
                {favorites.map((music) => {
                  const { artworkUrl100, trackName, previewUrl, trackId } = music;
                  return (
                    <li key={ trackId }>
                      <img
                        src={ artworkUrl100 }
                        alt={ trackName }
                      />
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
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
