package org.iceman.equipment_accounting.service

import org.iceman.equipment_accounting.entity.Department
import org.iceman.equipment_accounting.model.Department as DepartmentModel

interface DepartmentService {
    fun saveDepartment(department: DepartmentModel)

    fun getDepartmentById(id: Long): Department?

    fun getAllDepartments(): List<Department>
}