package org.iceman.equipment_accounting.repository

import org.iceman.equipment_accounting.entity.Employer
import org.iceman.equipment_accounting.model.Employer as EmployerModel
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param


interface EmployerRepository: JpaRepository<Employer, Long> {
    @Query(value = """
    INSERT INTO employer (name, last_name, age, department_id)
    VALUES (:#{#employer?.name}, :#{#employer?.lastName}, :#{#employer?.age}, :#{#employer?.departmentId})
    RETURNING id
""", nativeQuery = true)
    fun insertAndReturnId(@Param("employer") employer: EmployerModel): Long
}