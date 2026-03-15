package org.iceman.equipment_accounting.service

import org.iceman.equipment_accounting.entity.Employer;
import org.iceman.equipment_accounting.model.Employer as EmployerModel

interface EmployerService {
    fun saveEmployer(employer: EmployerModel)

    fun getEmployerById(id: Long): Employer?

    fun getAllEmployers(): List<Employer>
}
