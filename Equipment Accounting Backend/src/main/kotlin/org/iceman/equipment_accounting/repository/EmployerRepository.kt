package org.iceman.equipment_accounting.repository

import org.iceman.equipment_accounting.entity.Employer
import org.springframework.data.jpa.repository.JpaRepository


interface EmployerRepository: JpaRepository<Employer, Long> {
}