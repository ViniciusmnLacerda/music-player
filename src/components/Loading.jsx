import React from 'react';
import { Puff } from 'react-loader-spinner';
import '../Styles/Loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading-puff">
        <Puff
          height="80"
          width="80"
          radisu={1}
          color="#fff"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible
        />
      </div>
    );
  }
}

export default Loading;
