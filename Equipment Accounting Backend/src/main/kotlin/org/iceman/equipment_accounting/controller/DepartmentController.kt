package org.iceman.equipment_accounting.controller

import org.iceman.equipment_accounting.entity.Department
import org.iceman.equipment_accounting.service.DepartmentService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.iceman.equipment_accounting.model.Department as DepartmentModel


@RestController
@RequestMapping("/api/v1/departments")
class DepartmentController(
    private val departmentService: DepartmentService
) {
    @GetMapping("/", "")
    fun getAllDepartments(): ResponseEntity<List<Department>> {
        val departments = departmentService.getAllDepartments()
        return ResponseEntity.ok(departments)
    }

    @GetMapping("/{id}")
    fun getDepartmentById(
        @PathVariable
        id: Long
    ): ResponseEntity<Department> {
        val departments = departmentService.getDepartmentById(id)
        return ResponseEntity.ok(departments)
    }

    @PostMapping("/", "")
    fun saveDepartment(@RequestBody department: DepartmentModel) {
        departmentService.saveDepartment(department)
    }
}