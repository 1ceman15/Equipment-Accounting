package org.iceman.equipment_accounting.service

import org.iceman.equipment_accounting.entity.Equipment
import org.iceman.equipment_accounting.repository.EquipmentRepository

class EquipmentServiceImpl(
    private val equipmentRepository: EquipmentRepository
) : EquipmentService {
    override fun saveEquipment(employer: Equipment) {
        equipmentRepository.save(employer)
    }

    override fun getEquipmentById(id: Long): Equipment? {
        val equipment = equipmentRepository.findById(id).orElse(null)
        return equipment
    }

    override fun getAllEquipment(): List<Equipment> {
        val equipment = equipmentRepository.findAll()
        return equipment
    }
}