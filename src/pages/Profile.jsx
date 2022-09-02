import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

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
    const { loading, perfil: { name, email, image, description } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div>
            <div>
              <img
                data-testid="profile-image"
                src={ image }
                alt={ name }
              />
              <div>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
            </div>
            <div>
              <p>Nome</p>
              <p>{ name }</p>
            </div>
            <div>
              <p>E-mail</p>
              <p>{ email }</p>
            </div>
            <div>
              <p>Descrição</p>
              <p>{ description }</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
