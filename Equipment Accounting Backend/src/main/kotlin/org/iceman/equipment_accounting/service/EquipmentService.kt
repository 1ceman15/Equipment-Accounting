package org.iceman.equipment_accounting.service

import org.iceman.equipment_accounting.entity.Equipment

interface EquipmentService {
    fun saveEquipment(employer: Equipment)

    fun getEquipmentById(id: Long): Equipment?

    fun getAllEquipment(): List<Equipment>
}