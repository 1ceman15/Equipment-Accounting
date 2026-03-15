package org.iceman.equipment_accounting.model

import java.time.LocalDate

data class Equipment(
    val id: Long? = null,
    val name: String? = null,
    val status: String? = null,
    val startDate: LocalDate? = null,
    val employerId: Long? = null,
)