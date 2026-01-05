package org.iceman.equipment_accounting.repository

import org.iceman.equipment_accounting.entity.Equipment
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface EquipmentRepository: JpaRepository<Equipment, Long> {
    fun getEquipmentByEmployerIdAndStatus(userId: Long, status: String): List<Equipment>
}