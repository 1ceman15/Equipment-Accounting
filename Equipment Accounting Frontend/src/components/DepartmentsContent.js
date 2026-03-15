import React from "react";
import { getAllDepartments, createDepartment } from "../helpers/department_helper";
import "./EmployersContent.css"; // переиспользуем те же стили для модалки

export default class DepartmentsContent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      departments: [],
      showModal: false,
      newDepartment: {
        name: ''
      },
      loading: false,
      saving: false,
      error: null
    };
  }

  componentDidMount() {
    this.loadDepartments();
  }

  loadDepartments = () => {
    this.setState({ loading: true, error: null });
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

  // Открыть модальное окно
  openModal = () => {
    this.setState({
      showModal: true,
      newDepartment: { name: '' },
      saving: false,
      error: null
    });
  };

  // Закрыть модальное окно
  closeModal = () => {
    this.setState({ showModal: false });
  };

  // Обработка изменений в поле ввода
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prev => ({
      newDepartment: {
        ...prev.newDepartment,
        [name]: value
      }
    }));
  };

  // Отправка формы
  handleSubmit = (e) => {
    e.preventDefault();
    const { newDepartment } = this.state;

    if (!newDepartment.name.trim()) {
      alert("Введите название департамента");
      return;
    }

    this.setState({ saving: true, error: null });

    createDepartment({ name: newDepartment.name.trim() })
      .then(() => {
        this.closeModal();
        this.loadDepartments(); // обновляем список
      })
      .catch(error => {
        console.error("createDepartment error:", error);
        this.setState({ error: "Ошибка при создании департамента" });
      })
      .finally(() => {
        this.setState({ saving: false });
      });
  };

  render() {
    const { departments, showModal, newDepartment, loading, saving, error } = this.state;

    if (loading) {
      return <div>Загрузка подразделений...</div>;
    }

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Departments</h2>
          <button className="btn btn-success" onClick={this.openModal}>+ Добавить</button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {departments.length === 0 && !loading && <p>Нет данных</p>}

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

        {/* Модальное окно добавления департамента */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Добавить департамент</h3>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Название</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={newDepartment.name}
                    onChange={this.handleInputChange}
                    required
                    autoFocus
                  />
                </div>
                <div className="modal-actions">
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? "Сохранение..." : "Сохранить"}
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