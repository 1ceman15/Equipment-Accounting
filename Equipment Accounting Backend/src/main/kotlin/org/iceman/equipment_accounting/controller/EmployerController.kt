package org.iceman.equipment_accounting.controller

import org.iceman.equipment_accounting.entity.Employer
import org.iceman.equipment_accounting.service.EmployerService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.iceman.equipment_accounting.model.Employer as EmployerModel

@RestController
@RequestMapping("/api/v1/employers")
class EmployerController(
    private val employerService: EmployerService
) {
    @GetMapping("/", "")
    fun getAllEmployers(): ResponseEntity<List<EmployerModel>> {
        val employers = employerService.getAllEmployers()
        return ResponseEntity.ok(employers)
    }

    @GetMapping("/{id}")
    fun getEmployerById(
        @PathVariable id: Long
    ): ResponseEntity<Employer> {
        val employer = employerService.getEmployerById(id)
        return ResponseEntity.ok(employer)
    }

    @PostMapping("/", "")
    fun saveEmployer(
        @RequestBody employer: EmployerModel
    ) {
        employerService.saveEmployer(employer)
    }
}