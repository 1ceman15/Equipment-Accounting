import React from "react";
import { getAllDepartments } from "../helpers/department_helper";

export default class DepartmentsContent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      departments: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    this.loadDepartments();
  }

  loadDepartments = () => {
    getAllDepartments()
      .then(response => {
        console.log('DepartmentsContent: response received', response);

        let departmentsData = response.data;

        // Проверка на пагинацию (Spring Page)
        if (departmentsData && departmentsData.content && Array.isArray(departmentsData.content)) {
          console.log('DepartmentsContent: detected paginated response, using content');
          departmentsData = departmentsData.content;
        }
        // Проверка на прямой массив
        else if (Array.isArray(departmentsData)) {
          console.log('DepartmentsContent: detected array response');
          // уже массив, ничего не делаем
        }
        // Проверка на формат Spring Data Rest (hal+json)
        else if (departmentsData && departmentsData._embedded && departmentsData._embedded.departments) {
          console.log('DepartmentsContent: detected _embedded response');
          departmentsData = departmentsData._embedded.departments;
        }
        else {
          console.error('DepartmentsContent: unexpected response format', departmentsData);
          this.setState({
            departments: [],
            loading: false,
            error: 'Неверный формат данных от сервера'
          });
          return;
        }

        // Финальная проверка на массив
        if (!Array.isArray(departmentsData)) {
          console.error('DepartmentsContent: after extraction, data is not an array', departmentsData);
          this.setState({
            departments: [],
            loading: false,
            error: 'Ошибка обработки данных'
          });
          return;
        }

        console.log('DepartmentsContent: setting departments data', departmentsData);
        this.setState({
          departments: departmentsData,
          loading: false
        });
      })
      .catch(error => {
        console.error('DepartmentsContent: error', error);
        this.setState({
          loading: false,
          error: error.message || 'Ошибка загрузки'
        });
      });
  };

  render() {
    const { departments, loading, error } = this.state;

    if (loading) {
      return <div>Загрузка подразделений...</div>;
    }

    if (error) {
      return <div>Ошибка: {error}</div>;
    }

    return (
      <div>
        <h2>Departments</h2>
        {departments.length === 0 && <p>Нет данных</p>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {departments.map(dep => (
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