package org.iceman.equipment_accounting.repository

import org.iceman.equipment_accounting.entity.Equipment
import org.iceman.equipment_accounting.model.Equipment as EquipmentModel
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface EquipmentRepository: JpaRepository<Equipment, Long> {
    @Query(
        value = """
            INSERT INTO equipment (id, name, status, start_date, employer_id)
            VALUES (
                :#{#eq.id},
                :#{#eq?.name},
                :#{#eq?.status},
                :#{#eq?.startDate},
                :#{#eq?.employerId}
            )
        """,
        nativeQuery = true
    )
    fun saveEquipment(@Param("eq") equipment: EquipmentModel)

    fun getEquipmentByEmployerIdAndStatus(userId: Long, status: String): List<Equipment>
}