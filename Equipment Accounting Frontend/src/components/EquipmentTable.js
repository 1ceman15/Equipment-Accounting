import React from "react";

export default function EquipmentTable({ equipment, employers, onEdit }) {
  if (!equipment || equipment.length === 0) {
    return <p>No equipment found</p>;
  }

  // Функция для получения ФИО сотрудника по объекту оборудования
  const getEmployerName = (eq) => {
    // Пытаемся получить id сотрудника: либо из eq.employer.id, либо из eq.employerId
    const employerId = eq.employer?.id || eq.employerId;
    if (!employerId) return "Unassigned";
    const emp = employers.find(e => e.id === employerId);
    return emp ? `${emp.name} ${emp.lastName}` : "Unassigned";
  };

  return (
    <table className="table table-striped mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>Статус</th>
          <th>Дата введения в эксплуатацию</th>
          <th>Сотрудник</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {equipment.map(eq => (
          <tr key={eq.id}>
            <td>{eq.id}</td>
            <td>{eq.name}</td>
            <td>{eq.status}</td>
            <td>{eq.startDate}</td>
            <td>{getEmployerName(eq)}</td>
            <td>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => onEdit(eq)}
                title="Редактировать"
              >
                ✏️
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}