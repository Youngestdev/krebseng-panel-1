import axios from 'axios';
import React, {Component} from 'react';
import { CircleSpinner } from 'react-spinners-kit';
import auth0Client from '../Auth';
import firebaseClient from '../services/firebase';


const fbTokenFactory = 'http://localhost:3001/firebase';

function LoadingMessage() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 text-center">
          <CircleSpinner />
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
        const fbCustomToken = await axios.get(fbTokenFactory, {
          headers: { authorization: `Bearer ${auth0Client.getIdToken()}` }
        });
        firebaseClient.setToken(fbCustomToken.data.firebaseToken)
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
