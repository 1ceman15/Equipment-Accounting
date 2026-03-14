import React from "react";
import { getAllEmployers } from "../helpers/employer_helper";

export default class EmployersContent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      employers: []
    };
  }

  componentDidMount() {
    this.loadEmployers();
  }

  loadEmployers = () => {

    getAllEmployers()
      .then(response => {

        this.setState({
          employers: response.data
        });

      })
      .catch(error => {
        console.error(error);
      });

  };

  render() {

    return (
      <div>

        <h2>Employers</h2>

        <table className="table table-striped">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Last name</th>
              <th>Age</th>
            </tr>
          </thead>

          <tbody>

            {this.state.employers.map(emp => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.lastName}</td>
                <td>{emp.age}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>
    );
  }
}