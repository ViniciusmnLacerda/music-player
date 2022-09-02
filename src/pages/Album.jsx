import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      loading: false,
      album: response,
    });
  }

  render() {
    const { loading, album } = this.state;
    const artistInfo = album[0];
    const musics = album.filter((_, index) => index > 0);
    console.log(musics);
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div>
            <div>
              <img
                src={ artistInfo.artworkUrl100 }
                alt={ artistInfo.collectionName }
              />
              <div>
                <p data-testid="album-name">{ artistInfo.collectionName }</p>
                <p data-testid="artist-name">{ artistInfo.artistName }</p>
              </div>
            </div>
            <div>
              <MusicCard
                musics={ musics }
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
