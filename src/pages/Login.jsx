import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

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
      <div data-testid="page-login">
        {loading === 'false' ? (
          <div>
            <h1>Preencha os dados de login</h1>
            <form>
              <label htmlFor="name">
                <input
                  data-testid="login-name-input"
                  type="text"
                  name="name"
                  id="name"
                  onChange={ this.onInputChange }
                  value={ name }
                />
              </label>
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ buttonLoginIsDisabled }
                onClick={ this.onClickLogin }
              >
                Entrar
              </button>
            </form>
          </div>
        ) : (
          <div>
            {loading === 'loading' ? (
              <Loading />
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
