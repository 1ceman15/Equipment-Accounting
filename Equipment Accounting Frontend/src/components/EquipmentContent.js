import React from "react";
import { getAllEquipment } from "../helpers/equipment_helper";

export default class EquipmentContent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      equipment: []
    };
  }

  componentDidMount() {
    this.loadEquipment();
  }

  loadEquipment = () => {

    getAllEquipment()
      .then(response => {

        this.setState({
          equipment: response.data
        });

      })
      .catch(error => {
        console.error(error);
      });

  };

  render() {

    return (
      <div>

        <h2>Equipment</h2>

        <table className="table table-striped">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Start date</th>
            </tr>
          </thead>

          <tbody>

            {this.state.equipment.map(eq => (
              <tr key={eq.id}>
                <td>{eq.id}</td>
                <td>{eq.name}</td>
                <td>{eq.status}</td>
                <td>{eq.startDate}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>
    );
  }
}