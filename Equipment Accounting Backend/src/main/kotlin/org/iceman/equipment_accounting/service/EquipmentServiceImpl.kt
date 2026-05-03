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
    override fun getEquipmentById(id: Long): EquipmentModel? {
        val equipment = equipmentRepository.findById(id).orElse(null)
        return equipment.toModel()
    }

    override fun getAllEquipment(): List<EquipmentModel> {
        val equipment = equipmentRepository.findAll()
        return equipment.map { it.toModel() }
    }

    override fun getEquipmentByEmployerIdAndStatus(equipment: EquipmentModel): List<EquipmentModel> {
        if (equipment.employerId == null || equipment.status == null) {
            throw IllegalArgumentException("employerId and status does not present")
        }

        val equipment = equipmentRepository.getEquipmentByEmployerIdAndStatus(
            equipment.employerId,
                equipment.status
            )
        return equipment.map { it.toModel() }
    }

    @Transactional
    @CachePut(cacheNames = ["equipment"], key = "#id")
    override fun saveEquipment(equipment: EquipmentModel) {
        equipmentRepository.save(equipment.toEntity())
    }

    @Transactional
    @CachePut(cacheNames = ["equipment"], key = "#id")
    override fun updateEquipment(
        id: Long,
        equipmentModel: EquipmentModel
    ): EquipmentModel {
        val existing = equipmentRepository.findById(id)
            .orElseThrow { IllegalArgumentException("Оборудование с id $id не найдено") }

        equipmentModel.name?.let { existing.name = it }
        equipmentModel.status?.let { existing.status = it }
        equipmentModel.startDate?.let { existing.startDate = it }
        equipmentModel.employerId?.let { employerId ->
            existing.employer = Employer(id = employerId)
        }

        val equipment = equipmentRepository.save(existing)
        return equipment.toModel()
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
    private fun Equipment.toModel(): EquipmentModel {
        return EquipmentModel(
            id = id,
            name = name,
            status = status,
            startDate = startDate,
            employerId = employer?.id
        )
    }
}