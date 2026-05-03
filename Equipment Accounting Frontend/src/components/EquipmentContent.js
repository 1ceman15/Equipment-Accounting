import React from "react";
import { getAllEquipment, createEquipment, updateEquipment } from "../helpers/equipment_helper";
import { getAllEmployers } from "../helpers/employer_helper";
import EquipmentTable from "./EquipmentTable";
import "./EmployersContent.css";

export default class EquipmentContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      equipment: [],
      employers: [],
      showModal: false,
      showEditModal: false,
      editingEquipment: null,
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

  // Сортировка по id (по возрастанию)
  sortEquipmentById = (equipmentList) => {
    if (!Array.isArray(equipmentList)) return [];
    return [...equipmentList].sort((a, b) => (a.id || 0) - (b.id || 0));
  };

  componentDidMount() {
    this.loadEquipment();
    this.loadEmployers();
  }

  loadEquipment = () => {
    getAllEquipment()
      .then(response => {
        let equipmentData = response.data;

        if (equipmentData && equipmentData.content && Array.isArray(equipmentData.content)) {
          equipmentData = equipmentData.content;
        } else if (Array.isArray(equipmentData)) {
          // уже массив
        } else if (equipmentData && equipmentData._embedded && equipmentData._embedded.equipment) {
          equipmentData = equipmentData._embedded.equipment;
        } else {
          this.setState({
            equipment: [],
            loading: false,
            error: 'Неверный формат данных от сервера'
          });
          return;
        }

        if (!Array.isArray(equipmentData)) {
          this.setState({
            equipment: [],
            loading: false,
            error: 'Ошибка обработки данных'
          });
          return;
        }

        const sortedEquipment = this.sortEquipmentById(equipmentData);
        this.setState({
          equipment: sortedEquipment,
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

        if (employersData && employersData.content && Array.isArray(employersData.content)) {
          employersData = employersData.content;
        } else if (Array.isArray(employersData)) {
          // already array
        } else if (employersData && employersData._embedded && employersData._embedded.employers) {
          employersData = employersData._embedded.employers;
        } else {
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

    const equipmentData = {
      name: newEquipment.name.trim(),
      status: newEquipment.status,
      startDate: newEquipment.startDate || null,
      employerId: newEquipment.employerId ? parseInt(newEquipment.employerId, 10) : null
    };

    createEquipment(equipmentData)
      .then(() => {
        this.closeModal();
        this.loadEquipment(); // перезагружает и сортирует
      })
      .catch(error => {
        console.error("createEquipment error:", error);
        this.setState({ error: "Ошибка при создании оборудования" });
      })
      .finally(() => {
        this.setState({ saving: false });
      });
  };

  // Редактирование
  openEditModal = (equipment) => {
    this.setState({
      showEditModal: true,
      editingEquipment: {
        id: equipment.id,
        name: equipment.name || '',
        status: equipment.status || 'AVAILABLE',
        startDate: equipment.startDate || '',
        employerId: equipment.employerId || (equipment.employer ? equipment.employer.id : '')
      },
      saving: false,
      error: null
    });
  };

  closeEditModal = () => {
    this.setState({ showEditModal: false, editingEquipment: null });
  };

  handleEditInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prev => ({
      editingEquipment: {
        ...prev.editingEquipment,
        [name]: value
      }
    }));
  };

  handleEditSubmit = (e) => {
    e.preventDefault();
    const { editingEquipment } = this.state;

    if (!editingEquipment.name.trim()) {
      alert("Введите название оборудования");
      return;
    }
    if (!editingEquipment.status) {
      alert("Выберите статус");
      return;
    }

    this.setState({ saving: true, error: null });

    const equipmentData = {
      name: editingEquipment.name.trim(),
      status: editingEquipment.status,
      startDate: editingEquipment.startDate || null,
      employerId: editingEquipment.employerId ? parseInt(editingEquipment.employerId, 10) : null
    };

    updateEquipment(editingEquipment.id, equipmentData)
      .then(() => {
        this.closeEditModal();
        this.loadEquipment();
      })
      .catch(error => {
        console.error("updateEquipment error:", error);
        this.setState({ error: "Ошибка при обновлении оборудования" });
      })
      .finally(() => {
        this.setState({ saving: false });
      });
  };

  render() {
    const { equipment, employers, showModal, showEditModal, editingEquipment, newEquipment, loading, saving, error } = this.state;

    if (loading) {
      return <div>Загрузка оборудования...</div>;
    }

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Оборудование</h2>
          <button className="btn btn-success" onClick={this.openModal}>+ Добавить</button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* Передаём equipment, employers и onEdit */}
        <EquipmentTable equipment={equipment} employers={employers} onEdit={this.openEditModal} />

        {/* Модальное окно добавления */}
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

        {/* Модальное окно редактирования */}
        {showEditModal && editingEquipment && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Редактировать оборудование</h3>
              <form onSubmit={this.handleEditSubmit}>
                <div className="form-group">
                  <label>Название</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={editingEquipment.name}
                    onChange={this.handleEditInputChange}
                    required
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label>Статус</label>
                  <select
                    className="form-control"
                    name="status"
                    value={editingEquipment.status}
                    onChange={this.handleEditInputChange}
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
                    value={editingEquipment.startDate}
                    onChange={this.handleEditInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Сотрудник</label>
                  <select
                    className="form-control"
                    name="employerId"
                    value={editingEquipment.employerId}
                    onChange={this.handleEditInputChange}
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
                    {saving ? "Сохранение..." : "Сохранить изменения"}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={this.closeEditModal}>
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