import React from 'react';
import { Audio } from 'react-loader-spinner';
import '../Styles/LoadingMusic.css';

class LoadingMusic extends React.Component {
  render() {
    return (
      <div>
        <Audio
          height="80"
          width="80"
          radius="9"
          color="#6c63ff"
          ariaLabel="three-dots-loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    );
  }
}

export default LoadingMusic;
