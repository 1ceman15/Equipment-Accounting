package org.iceman.equipment_accounting.service

import org.iceman.equipment_accounting.entity.Department
import org.iceman.equipment_accounting.repository.DepartmentRepository
import org.springframework.cache.annotation.CachePut
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import org.iceman.equipment_accounting.model.Department as DepartmentModel

@Service
class DepartmentServiceImpl(
    private val departmentRepository: DepartmentRepository
): DepartmentService {
    @CachePut(cacheNames = ["department"], key = "#id")
    override fun saveDepartment(department: DepartmentModel) {
        val entity = Department(
            name = department.name,
            employers = listOf()
        )
        departmentRepository.save(entity)
    }

    @Cacheable(cacheNames = ["department"], key = "#id")
    override fun getDepartmentById(id: Long): Department? {
        val department = departmentRepository.findById(id).orElse(null)
        return department
    }

    override fun getAllDepartments(): List<Department> {
        val departments = departmentRepository.findAll()
        return departments
    }
}