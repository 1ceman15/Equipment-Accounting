package org.iceman.equipment_accounting.repository

import org.iceman.equipment_accounting.entity.Department
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface DepartmentRepository: JpaRepository<Department, Long> {
}