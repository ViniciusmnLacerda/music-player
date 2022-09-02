import propTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import '../Styles/Album.css';

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
    const { match } = this.props;
    return (
      <div className="page-album" data-testid="page-album">
        <Header path={match.url} />
        {loading ? (
          <Loading />
        ) : (
          <div className="artist-container">
            <div className="artist-card">
              <div className="artist-img">
                <img
                  src={artistInfo.artworkUrl100}
                  alt={artistInfo.collectionName}
                />
              </div>
              <div className="artist-info">
                <p className="artist-name" data-testid="artist-name">{ artistInfo.artistName }</p>
                <p className="album-name" data-testid="album-name">{ artistInfo.collectionName }</p>
              </div>
            </div>
            <MusicCard
              musics={musics}
            />
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    url: propTypes.string.isRequired,
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
