package org.iceman.equipment_accounting.service

import org.iceman.equipment_accounting.entity.Employer
import org.iceman.equipment_accounting.repository.EmployerRepository
import org.springframework.stereotype.Service

@Service
class EmployerServiceImpl(
    private val employerRepository: EmployerRepository
): EmployerService {
    override fun saveEmployer(employer: Employer) {
        employerRepository.save(employer)
    }

    override fun getEmployerById(id: Long): Employer? {
        val employer = employerRepository.findById(id).orElse(null)
        return employer
    }

    override fun getAllEmployers(): List<Employer> {
        val employers = employerRepository.findAll()
        return employers
    }
}