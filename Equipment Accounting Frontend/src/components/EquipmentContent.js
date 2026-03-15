import React from "react";
import { getAllEquipment, createEquipment } from "../helpers/equipment_helper";
import { getAllEmployers } from "../helpers/employer_helper";
import EquipmentTable from "./EquipmentTable";
import "./EmployersContent.css"; // переиспользуем стили для модалки

export default class EquipmentContent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      equipment: [],
      employers: [],
      showModal: false,
      newEquipment: {
        name: '',
        status: 'AVAILABLE',
        startDate: '',
        employerId: ''
      },
      loading: true,
      saving: false,
      error: null
    };
  }

  componentDidMount() {
    this.loadEquipment();
    this.loadEmployers();
  }

  loadEquipment = () => {
    getAllEquipment()
      .then(response => {
        console.log('EquipmentContent: response received', response);

        let equipmentData = response.data;

        // Проверка на пагинацию (Spring Page)
        if (equipmentData && equipmentData.content && Array.isArray(equipmentData.content)) {
          console.log('EquipmentContent: detected paginated response, using content');
          equipmentData = equipmentData.content;
        }
        // Если data – сам массив
        else if (Array.isArray(equipmentData)) {
          console.log('EquipmentContent: detected array response');
        }
        // Если data – другой объект, возможно, содержит поле _embedded? (для Spring Data Rest)
        else if (equipmentData && equipmentData._embedded && equipmentData._embedded.equipment) {
          console.log('EquipmentContent: detected _embedded response');
          equipmentData = equipmentData._embedded.equipment;
        }
        else {
          console.error('EquipmentContent: unexpected response format', equipmentData);
          this.setState({
            equipment: [],
            loading: false,
            error: 'Неверный формат данных от сервера'
          });
          return;
        }

        if (!Array.isArray(equipmentData)) {
          console.error('EquipmentContent: after extraction, data is not an array', equipmentData);
          this.setState({
            equipment: [],
            loading: false,
            error: 'Ошибка обработки данных'
          });
          return;
        }

        console.log('EquipmentContent: setting equipment data', equipmentData);
        this.setState({
          equipment: equipmentData,
          loading: false
        });
      })
      .catch(error => {
        console.error('EquipmentContent: error', error);
        this.setState({
          loading: false,
          error: error.message || 'Ошибка загрузки'
        });
      });
  };

  loadEmployers = () => {
    getAllEmployers()
      .then(response => {
        let employersData = response.data;

        // Аналогичная обработка формата ответа
        if (employersData && employersData.content && Array.isArray(employersData.content)) {
          employersData = employersData.content;
        } else if (Array.isArray(employersData)) {
          // уже массив
        } else if (employersData && employersData._embedded && employersData._embedded.employers) {
          employersData = employersData._embedded.employers;
        } else {
          console.error('loadEmployers: unexpected format', employersData);
          employersData = [];
        }

        this.setState({ employers: Array.isArray(employersData) ? employersData : [] });
      })
      .catch(error => {
        console.error('loadEmployers error:', error);
      });
  };

  openModal = () => {
    this.setState({
      showModal: true,
      newEquipment: {
        name: '',
        status: 'AVAILABLE',
        startDate: '',
        employerId: ''
      },
      saving: false,
      error: null
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prev => ({
      newEquipment: {
        ...prev.newEquipment,
        [name]: value
      }
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { newEquipment } = this.state;

    if (!newEquipment.name.trim()) {
      alert("Введите название оборудования");
      return;
    }
    if (!newEquipment.status) {
      alert("Выберите статус");
      return;
    }

    this.setState({ saving: true, error: null });

    // Формируем данные для отправки на бэкенд
    const equipmentData = {
      name: newEquipment.name.trim(),
      status: newEquipment.status,
      startDate: newEquipment.startDate || null,
      employerId: newEquipment.employerId ? parseInt(newEquipment.employerId, 10) : null
    };

    createEquipment(equipmentData)
      .then(() => {
        this.closeModal();
        this.loadEquipment(); // обновляем список
      })
      .catch(error => {
        console.error("createEquipment error:", error);
        this.setState({ error: "Ошибка при создании оборудования" });
      })
      .finally(() => {
        this.setState({ saving: false });
      });
  };

  render() {
    const { equipment, employers, showModal, newEquipment, loading, saving, error } = this.state;

    if (loading) {
      return <div>Загрузка оборудования...</div>;
    }

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Equipment</h2>
          <button className="btn btn-success" onClick={this.openModal}>+ Добавить</button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <EquipmentTable equipment={equipment} />

        {/* Модальное окно добавления оборудования */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Добавить оборудование</h3>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Название</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={newEquipment.name}
                    onChange={this.handleInputChange}
                    required
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label>Статус</label>
                  <select
                    className="form-control"
                    name="status"
                    value={newEquipment.status}
                    onChange={this.handleInputChange}
                    required
                  >
                    <option value="AVAILABLE">Свободен</option>
                    <option value="IN_USE">Используется</option>
                    <option value="REPAIR">В ремонте</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Дата начала использования</label>
                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    value={newEquipment.startDate}
                    onChange={this.handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Сотрудник</label>
                  <select
                    className="form-control"
                    name="employerId"
                    value={newEquipment.employerId}
                    onChange={this.handleInputChange}
                  >
                    <option value="">Не назначен</option>
                    {employers.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} {emp.lastName}
                      </option>
                    ))}
                  </select>
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