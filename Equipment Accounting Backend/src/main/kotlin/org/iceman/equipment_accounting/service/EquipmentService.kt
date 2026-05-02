package org.iceman.equipment_accounting.service

import org.iceman.equipment_accounting.model.Equipment as EquipmentModel
import org.iceman.equipment_accounting.entity.Equipment

interface EquipmentService {
    fun saveEquipment(equipment: EquipmentModel)

    fun getEquipmentById(id: Long): Equipment?

    fun getAllEquipment(): List<Equipment>

    fun getEquipmentByEmployerIdAndStatus(equipment: EquipmentModel): List<Equipment>

    fun updateEquipment(id: Long, equipment: EquipmentModel): Equipment
}