import React from "react";

export default function EquipmentTable({ equipment, onEdit }) {   // добавили проп onEdit
  if (!equipment || equipment.length === 0) {
    return <p>No equipment found</p>;
  }

  return (
    <table className="table table-striped mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
          <th>Start date</th>
          <th>Employer</th>
          <th>Actions</th>   {/* новая колонка */}
        </tr>
      </thead>
      <tbody>
        {equipment.map(eq => (
          <tr key={eq.id}>
            <td>{eq.id}</td>
            <td>{eq.name}</td>
            <td>{eq.status}</td>
            <td>{eq.startDate}</td>
            <td>
              {eq.employer
                ? eq.employer.name + " " + eq.employer.lastName
                : "Unassigned"}
            </td>
            <td>
              {/* значок редактирования (можно использовать любой иконки, например, FontAwesome или простую ✏️) */}
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