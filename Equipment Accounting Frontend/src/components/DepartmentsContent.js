import React from "react";
import { getAllDepartments } from "../helpers/department_helper";

export default class DepartmentsContent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      departments: []
    };
  }

  componentDidMount() {
    this.loadDepartments();
  }

  loadDepartments = () => {

    getAllDepartments()
      .then(response => {

        this.setState({
          departments: response.data
        });

      })
      .catch(error => {
        console.error(error);
      });

  };

  render() {

    return (
      <div>

        <h2>Departments</h2>

        <table className="table table-striped">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>

          <tbody>

            {this.state.departments.map(dep => (
              <tr key={dep.id}>
                <td>{dep.id}</td>
                <td>{dep.name}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>
    );
  }
}