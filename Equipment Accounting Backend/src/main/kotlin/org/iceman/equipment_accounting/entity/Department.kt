package org.iceman.equipment_accounting.entity

import jakarta.persistence.*
import java.io.Serializable

@Entity
@Table(name = "department")
data class Department(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    val id: Long,

    @Column(name = "name", nullable = false, length = 150)
    val name: String,

    @OneToMany(
        mappedBy = "department",
        fetch = FetchType.LAZY
    )
    val employers: List<Employer>
) : Serializable
