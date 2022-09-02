import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isButtonSaveDisabled: true,
      name: '',
      email: '',
      image: '',
      description: '',
    };
    this.onClickSaveButton = this.onClickSaveButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true }, async () => {
      const recovered = await getUser();
      const { name, email, image, description } = recovered;
      this.setState({
        loading: false,
        name,
        email,
        image,
        description,
      }, this.validate);
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validate);
  }

  async onClickSaveButton(event) {
    event.preventDefault();
    const { name, email, image, description } = this.state;
    this.setState({ loading: true }, async () => {
      await updateUser({ name, email, image, description });
      const { history } = this.props;
      history.push('/profile');
    });
  }

  validate() {
    const { name, email, image, description } = this.state;
    const arrayValidate = [
      name.length > 0,
      email.length > 0,
      image.length > 0,
      description.length > 0]
      .every(Boolean);
    this.setState({ isButtonSaveDisabled: !arrayValidate });
  }

  render() {
    const { isButtonSaveDisabled, name, email,
      image, description, loading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div>
            <form>
              <div>
                <img
                  src={ image }
                  alt={ name }
                />
                <label htmlFor="image">
                  <input
                    data-testid="edit-input-image"
                    placeholder="Insira um link"
                    type="text"
                    name="image"
                    id="image"
                    value={ image }
                    onChange={ this.handleChange }
                  />
                </label>
              </div>
              <div>
                <label htmlFor="name">
                  Nome
                  <input
                    data-testid="edit-input-name"
                    type="text"
                    name="name"
                    id="name"
                    value={ name }
                    onChange={ this.handleChange }
                  />
                </label>
              </div>
              <div>
                <label htmlFor="email">
                  E-mail
                  <input
                    data-testid="edit-input-email"
                    type="email"
                    name="email"
                    id="email"
                    value={ email }
                    onChange={ this.handleChange }
                  />
                </label>
              </div>
              <div>
                <label htmlFor="description">
                  Descrição
                  <textarea
                    data-testid="edit-input-description"
                    placeholder="Sobre mim"
                    name="description"
                    id="description"
                    cols="30"
                    rows="10"
                    value={ description }
                    onChange={ this.handleChange }
                  />
                </label>
              </div>
            </form>
            <div>
              <button
                type="submit"
                data-testid="edit-button-save"
                disabled={ isButtonSaveDisabled }
                onClick={ this.onClickSaveButton }
              >
                Salvar
              </button>
            </div>
          </div>
        )}

      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
