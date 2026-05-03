package org.iceman.equipment_accounting.service

import jakarta.transaction.Transactional
import org.iceman.equipment_accounting.entity.Employer
import org.iceman.equipment_accounting.repository.DepartmentRepository
import org.iceman.equipment_accounting.repository.EmployerRepository
import org.springframework.cache.annotation.CachePut
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import org.iceman.equipment_accounting.model.Employer as EmployerModel

@Service
class EmployerServiceImpl(
    private val employerRepository: EmployerRepository,
    private val departmentRepository: DepartmentRepository
): EmployerService {
    @CachePut(cacheNames = ["employer"], key = "#id")
    @Transactional
    override fun saveEmployer(employer: EmployerModel) {
        val department = departmentRepository.findById(employer.departmentId)
            .orElse(null)

        val entity = Employer(
            id = null,
            name = employer.name,
            lastName = employer.lastName,
            age = employer.age,
            department = department
        )
        employerRepository.save(entity)
    }

    @Cacheable(cacheNames = ["employer"], key = "#id")
    override fun getEmployerById(id: Long): Employer? {
        val employer = employerRepository.findById(id).orElse(null)
        return employer
    }

    override fun getAllEmployers(): List<EmployerModel> {
        val employers = employerRepository.findAll()
        return employers.map { it.toModel() }
    }

    private fun Employer.toModel(): EmployerModel {
        return EmployerModel(
            id = this.id,
            name = this.name,
            lastName = this.lastName,
            age = this.age,
            departmentId = this.department?.id
        )
    }
}