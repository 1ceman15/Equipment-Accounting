package org.iceman.equipment_accounting.service

import org.iceman.equipment_accounting.entity.Department

interface DepartmentService {
    fun saveDepartment(department: Department)

    fun getDepartmentById(id: Long): Department?

    fun getAllDepartments(): List<Department>
}