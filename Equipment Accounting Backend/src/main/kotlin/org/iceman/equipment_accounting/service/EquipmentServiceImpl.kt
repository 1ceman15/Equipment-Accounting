package org.iceman.equipment_accounting.service

import org.iceman.equipment_accounting.entity.Employer
import org.iceman.equipment_accounting.entity.Equipment
import org.iceman.equipment_accounting.model.Equipment as EquipmentModel
import org.iceman.equipment_accounting.repository.EquipmentRepository
import org.springframework.cache.annotation.CachePut
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class EquipmentServiceImpl(
    private val equipmentRepository: EquipmentRepository
) : EquipmentService {
    @Cacheable(cacheNames = ["equipment"], key = "#id")
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

    @Transactional
    @CachePut(cacheNames = ["equipment"], key = "#id")
    override fun saveEquipment(equipment: EquipmentModel) {
        equipmentRepository.save(equipment.toEntity())
    }

    private fun EquipmentModel.toEntity(): Equipment {
        return Equipment(
            id = id,
            name = name,
            status = status,
            startDate = startDate,
            Employer(id = employerId)
        )
    }
}