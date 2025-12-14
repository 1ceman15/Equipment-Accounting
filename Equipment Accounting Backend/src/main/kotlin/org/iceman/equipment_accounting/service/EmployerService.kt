package org.iceman.equipment_accounting.service

import org.iceman.equipment_accounting.entity.Employer;

interface EmployerService {
    fun saveEmployer(employer: Employer)

    fun getEmployerById(id: Long): Employer?

    fun getAllEmployers(): List<Employer>
}
