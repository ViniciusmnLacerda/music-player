import propTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import '../Styles/Profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      perfil: {
        name: '',
        email: '',
        image: '',
        description: '',
      },
    };
  }

  async componentDidMount() {
    this.setState({ loading: true }, async () => {
      const recovered = await getUser();
      this.setState({
        loading: false,
        perfil: recovered,
      });
    });
  }

  render() {
    const {
      loading, perfil: {
        name, email, image, description,
      },
    } = this.state;
    const { match } = this.props;
    return (
      <div className="page-profile" data-testid="page-profile">
        <Header path={match.url} />
        {loading ? (
          <Loading />
        ) : (
          <div className="profile-container">
            <div className="card-profile">
              <div className="title-profile">
                <div className="img-profile">
                  <img
                    data-testid="profile-image"
                    src={image === '' ? '/user.svg' : image}
                    alt={name}
                  />
                </div>
                <div>
                  <button type="button">
                    <Link to="/profile/edit">Editar perfil</Link>
                  </button>
                </div>
              </div>
              <div className="profile-info">
                <h2>Nome</h2>
                <p>{ name }</p>
              </div>
              <div className="profile-info">
                <h2>E-mail</h2>
                <p>{ email }</p>
              </div>
              <div className="profile-info">
                <h2>Descrição</h2>
                <p>{ description }</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Profile.propTypes = {
  match: propTypes.shape({
    url: propTypes.string.isRequired,
  }).isRequired,
};

export default Profile;
