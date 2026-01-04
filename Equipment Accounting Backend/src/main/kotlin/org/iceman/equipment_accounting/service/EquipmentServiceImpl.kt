package org.iceman.equipment_accounting.service

import org.iceman.equipment_accounting.entity.Equipment
import org.iceman.equipment_accounting.model.Equipment as EquipmentModel
import org.iceman.equipment_accounting.repository.EquipmentRepository
import org.springframework.stereotype.Service

@Service
class EquipmentServiceImpl(
    private val equipmentRepository: EquipmentRepository
) : EquipmentService {
    override fun saveEquipment(equipment: EquipmentModel) {
        equipmentRepository.saveEquipment(equipment)
    }

    override fun getEquipmentById(id: Long): Equipment? {
        val equipment = equipmentRepository.findById(id).orElse(null)
        return equipment
    }

    override fun getAllEquipment(): List<Equipment> {
        val equipment = equipmentRepository.findAll()
        return equipment
    }

    override fun getEquipmentByEmployerIdAndStatus(equipment: EquipmentModel): List<Equipment> {
        if (equipment.employerId == null || equipment.status == null) {
            throw IllegalArgumentException("employerId and status does not present")
        }

        val equipment = equipmentRepository.getEquipmentByEmployerIdAndStatus(
            equipment.employerId,
                equipment.status
            )
        return equipment
    }
}