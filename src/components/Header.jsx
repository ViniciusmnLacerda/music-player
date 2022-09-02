import propTypes from 'prop-types';
import React from 'react';
import { MdHeadset } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../Styles/Header.css';
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
    const { path } = this.props;
    return (
      <header className="header-container" data-testid="header-component">
        {loading === 'loading' ? (
          <Loading />
        ) : (
          <div className="header-content">
            <div className="header">
              <MdHeadset />
              <div className="header-badge">
                <p data-testid="header-user-name">{ user.name }</p>
                <img src={user.image === '' ? '/user.svg' : user.image} alt="user" />
              </div>
            </div>

            <nav className="nav-container">
              <ul className="ul-nav">
                <div className="navlink">
                  <li>
                    <Link data-testid="link-to-search" to="/search">
                      <button className={path.includes('search') ? 'active' : undefined} type="button">Search</button>
                    </Link>
                  </li>
                </div>
                <div className="navlink">
                  <li>
                    <Link data-testid="link-to-favorites" to="/favorites">
                      <button className={path.includes('favorites') ? 'active' : undefined} type="button">Favorites</button>
                    </Link>
                  </li>
                </div>
                <div className="navlink">
                  <li>
                    <Link data-testid="link-to-profile" to="/profile">
                      <button className={path.includes('profile') ? 'active' : undefined} type="button">Profile</button>
                    </Link>
                  </li>
                </div>
              </ul>
            </nav>
          </div>
        )}
      </header>
    );
  }
}

Header.propTypes = {
  path: propTypes.string.isRequired,
};

export default Header;
