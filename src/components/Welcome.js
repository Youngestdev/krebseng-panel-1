import React from 'react';

function Welcome() {
  return (
    <div className="row justify-content-center">
      <div className="col-6">
        <div className="card">
          <div className="card-body text-center">
            <p>Bem-vindo ao painel de controle Krebs Engenharia.</p>
            <p>Para continuar, faça login.</p>
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
