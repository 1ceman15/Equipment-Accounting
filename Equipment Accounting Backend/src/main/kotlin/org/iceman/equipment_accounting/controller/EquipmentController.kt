package org.iceman.equipment_accounting.controller

import org.iceman.equipment_accounting.entity.Equipment
import org.iceman.equipment_accounting.model.Equipment as EquipmentModel
import org.iceman.equipment_accounting.service.EquipmentService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/equipment")
class EquipmentController(
    private val equipmentService: EquipmentService
) {
    @GetMapping("/", "")
    fun getAllEquipment(): ResponseEntity<List<Equipment>> {
        val equipment = equipmentService.getAllEquipment()
        return ResponseEntity.ok(equipment)
    }

    @GetMapping("/{id}")
    fun getEquipmentById(
        @PathVariable id: Long
    ): ResponseEntity<Equipment> {
        val equipment = equipmentService.getEquipmentById(id)
        return ResponseEntity.ok(equipment)
    }

    @PostMapping("/", "")
    fun saveEquipment(
        @RequestBody equipment: EquipmentModel
    ) {
        equipmentService.saveEquipment(equipment)
    }
}