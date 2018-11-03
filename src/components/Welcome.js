import React, {Fragment} from 'react';
import auth0Client from '../Auth';

function VisitorsView() {
  return (
    <Fragment>
      <p>Para continuar, faça login.</p>
      <button onClick={auth0Client.signIn} className="btn btn-primary">Login</button>
    </Fragment>
  );
}

function AuthenticatedUsersView() {
  return (
    <div>Para continuar, utilize o menu na barra de navegação (topo).</div>
  )
}

function Welcome() {
  return (
    <div className="row justify-content-center">
      <div className="col-6">
        <div className="card">
          <div className="card-body text-center">
            <p>Bem-vindo ao painel de controle Krebs Engenharia.</p>
            { auth0Client.isAuthenticated() && AuthenticatedUsersView() }
            { !auth0Client.isAuthenticated() && VisitorsView() }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
