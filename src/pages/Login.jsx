import React from 'react';
import { Redirect } from 'react-router-dom';
import LoadingMusic from '../components/LoadingMusic';
import { createUser } from '../services/userAPI';
import '../Styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonLoginIsDisabled: true,
      name: '',
      loading: 'false',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.validate = this.validate.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validate);
  }

  async onClickLogin(event) {
    event.preventDefault();
    const { name } = this.state;
    this.setState({ loading: 'loading' }, async () => {
      await createUser({ name });
      this.setState({ loading: 'finished' });
    });
  }

  validate() {
    const { name } = this.state;
    const disabled = name.length <= 2;
    this.setState({ buttonLoginIsDisabled: disabled });
  }

  render() {
    const { buttonLoginIsDisabled, name, loading } = this.state;
    return (
      <div className="login-container" data-testid="page-login">
        {loading === 'false' ? (
          <div className="card-login">
            <div className="image-container">
              <img className="login-image" src="/login.svg" alt="login ilustration" />
            </div>
            <form>
              <h1>Login</h1>
              <label htmlFor="name">
                <input
                  autoComplete="off"
                  data-testid="login-name-input"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onInputChange}
                  value={name}
                />
              </label>
              <button
                className="btn"
                type="submit"
                data-testid="login-submit-button"
                disabled={buttonLoginIsDisabled}
                onClick={this.onClickLogin}
              >
                Entrar
              </button>
            </form>
          </div>
        ) : (
          <div className="loading-music">
            {loading === 'loading' ? (
              <LoadingMusic />
            ) : (
              <Redirect to="/search" />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Login;
