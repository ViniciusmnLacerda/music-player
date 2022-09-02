import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: 'false',
      user: {},
    };
  }

  async componentDidMount() {
    this.setState({ loading: 'loading' }, async () => {
      const user = await getUser();
      this.setState({
        user,
        loading: 'false',
      });
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        {loading === 'loading' ? (
          <Loading />
        ) : (
          <div>
            <p data-testid="header-user-name">{ user.name }</p>
            <nav>
              <ul>
                <li><Link data-testid="link-to-search" to="/search">Pesquisa</Link></li>
                <li>
                  <Link
                    data-testid="link-to-favorites"
                    to="/favorites"
                  >
                    Favoritas
                  </Link>
                </li>
                <li><Link data-testid="link-to-profile" to="/profile">Perfil</Link></li>
              </ul>
            </nav>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
