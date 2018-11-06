import React, { Component } from 'react';
import firebaseClient from '../services/firebase';
import { PushSpinner } from 'react-spinners-kit';

function BuildingRecord(building) {
  return (
    <tr className="table-dark">
      <td>{building.name}</td>
      <td>{building.address}</td>
      <td className="text-right">
        <button className="btn btn-primary">Editar</button>
      </td>
    </tr>
  );
}

class Buildings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buildings: [],
      loading: true
    };
  }

  componentDidMount() {
    firebaseClient.setBuildingsListener(querySnapshot => {
      const buildings = [];
      querySnapshot.forEach(doc => {
        console.log(doc);
        buildings.push(doc.data());
      });
      this.setState({
        buildings,
        loading: false
      });
    });
  }

  render() {
    const { loading, buildings } = this.state;
    return (
      <div className="row">
        <div className="col-12">
          <table className="table">
            <thead>
              <tr className="table-primary">
                <th>Nome</th>
                <th>Endereço</th>
                <th />
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td colSpan={3} className="center">
                  <PushSpinner
                      size={30}
                      color="#686769"
                      loading={loading}
                    />
                  </td>
                </tr>
              {!loading && buildings.map(building => BuildingRecord(building))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Buildings;
