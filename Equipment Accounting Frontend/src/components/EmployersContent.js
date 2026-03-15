import React from "react";
import { getAllEmployers, createEmployer } from "../helpers/employer_helper";
import "./EmployersContent.css";

export default class EmployersContent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      employers: [],
      showModal: false,
      newEmployer: {
        name: '',
        lastName: '',
        age: '',
        departmentId: ''          // добавляем поле для ID отдела
      },
      loading: false,
      error: null
    };
  }

  componentDidMount() {
    this.loadEmployers();
  }

  loadEmployers = () => {
    getAllEmployers()
      .then(response => {
        // предполагаем, что response.data – массив сотрудников
        this.setState({ employers: response.data });
      })
      .catch(error => {
        console.error("loadEmployers error:", error);
        this.setState({ error: "Ошибка загрузки сотрудников" });
      });
  };

  openModal = () => {
    this.setState({
      showModal: true,
      newEmployer: { name: '', lastName: '', age: '', departmentId: '' }
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prev => ({
      newEmployer: {
        ...prev.newEmployer,
        [name]: value
      }
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { newEmployer } = this.state;

    // Валидация
    if (!newEmployer.name || !newEmployer.lastName || !newEmployer.age || !newEmployer.departmentId) {
      alert("Заполните все поля");
      return;
    }

    this.setState({ loading: true, error: null });

    // Преобразуем age и departmentId в числа
    const employerData = {
      name: newEmployer.name,
      lastName: newEmployer.lastName,
      age: parseInt(newEmployer.age, 10),
      departmentId: parseInt(newEmployer.departmentId, 10)
    };

    createEmployer(employerData)
      .then(() => {
        this.closeModal();
        this.loadEmployers(); // обновляем список
      })
      .catch(error => {
        console.error("createEmployer error:", error);
        this.setState({ error: "Ошибка при создании сотрудника" });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { employers, showModal, newEmployer, loading, error } = this.state;

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Employers</h2>
          <button className="btn btn-success" onClick={this.openModal}>+ Добавить</button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

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
            {employers.length === 0 ? (
              <tr><td colSpan="5">Нет данных</td></tr>
            ) : (
              employers.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.lastName}</td>
                  <td>{emp.age}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Модальное окно */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Добавить сотрудника</h3>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Имя</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={newEmployer.name}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Фамилия</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={newEmployer.lastName}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Возраст</label>
                  <input
                    type="number"
                    className="form-control"
                    name="age"
                    value={newEmployer.age}
                    onChange={this.handleInputChange}
                    required
                    min="1"
                    max="120"
                  />
                </div>
                <div className="form-group">
                  <label>ID отдела</label>
                  <input
                    type="number"
                    className="form-control"
                    name="departmentId"
                    value={newEmployer.departmentId}
                    onChange={this.handleInputChange}
                    required
                    min="1"
                  />
                </div>
                <div className="modal-actions">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Сохранение..." : "Сохранить"}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={this.closeModal}>
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}