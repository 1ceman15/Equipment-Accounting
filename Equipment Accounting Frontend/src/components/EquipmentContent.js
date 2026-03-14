import React from "react";
import { getAllEquipment } from "../helpers/equipment_helper";

export default class EquipmentContent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      equipment: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    this.loadEquipment();
  }

  loadEquipment = () => {
    getAllEquipment()
      .then(response => {
        console.log('EquipmentContent: response received', response);

        // Извлекаем данные – адаптируйте под структуру вашего API
        let equipmentData = response.data;

        // Если data – объект с полем content (пагинация Spring)
        if (equipmentData && equipmentData.content && Array.isArray(equipmentData.content)) {
          console.log('EquipmentContent: detected paginated response, using content');
          equipmentData = equipmentData.content;
        }
        // Если data – сам массив
        else if (Array.isArray(equipmentData)) {
          console.log('EquipmentContent: detected array response');
          // уже массив, ничего не делаем
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

        // Финальная проверка, что equipmentData – массив
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

  render() {
    const { equipment, loading, error } = this.state;

    if (loading) {
      return <div>Загрузка оборудования...</div>;
    }

    if (error) {
      return <div>Ошибка: {error}</div>;
    }

    return (
      <div>
        <h2>Equipment</h2>
        {equipment.length === 0 && <p>Нет данных</p>}
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
            {equipment.map(eq => (
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