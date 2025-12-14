package org.iceman.equipment_accounting.service

import org.iceman.equipment_accounting.entity.Department
import org.iceman.equipment_accounting.repository.DepartmentRepository
import org.springframework.stereotype.Service

@Service
class DepartmentServiceImpl(
    private val departmentRepository: DepartmentRepository
): DepartmentService {
    override fun saveDepartment(department: Department) {
        departmentRepository.save(department)
    }

    override fun getDepartmentById(id: Long): Department? {
        val department = departmentRepository.findById(id).orElse(null)
        return department
    }

    override fun getAllDepartments(): List<Department> {
        val departments = departmentRepository.findAll()
        return departments
    }
}