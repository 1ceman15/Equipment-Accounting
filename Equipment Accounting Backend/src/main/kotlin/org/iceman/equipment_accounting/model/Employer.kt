package org.iceman.equipment_accounting.model


data class Employer(
    val id: Long? = null,
    val name: String? = null,
    val lastName: String? = null,
    val age: Int? = null,
    val departmentId: Long
)
