package org.iceman.equipment_accounting.service

import org.iceman.equipment_accounting.model.Equipment as EquipmentModel
import org.iceman.equipment_accounting.entity.Equipment

interface EquipmentService {
    fun saveEquipment(equipment: EquipmentModel)

    fun getEquipmentById(id: Long): EquipmentModel?

    fun getAllEquipment(): List<EquipmentModel>

    fun getEquipmentByEmployerIdAndStatus(equipment: EquipmentModel): List<EquipmentModel>

    fun updateEquipment(id: Long, equipment: EquipmentModel): EquipmentModel
}