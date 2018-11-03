import React, {Component} from 'react';
import auth0Client from '../Auth';

function LoadingMessage() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 text-center">
          <p>Loading ...</p>
        </div>
      </div>
    </div>
  );
}

function withSplashScreen(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
      };
    }

    async componentDidMount() {
      try {
        await auth0Client.loadSession();
      } catch (err) {
        console.log(err);
      }
      this.setState({
        loading: false,
      });
    }

    render() {
      // while checking user session, show "loading" message
      if (this.state.loading) return LoadingMessage();

      // otherwise, show the desired route
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withSplashScreen;
