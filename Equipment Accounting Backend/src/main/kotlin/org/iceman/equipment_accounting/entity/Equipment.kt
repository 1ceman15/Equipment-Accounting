package org.iceman.equipment_accounting.entity

import jakarta.persistence.*
import java.io.Serializable
import java.time.LocalDate

@Entity
@Table(name = "equipment")
data class Equipment(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    val id: Long,

    @Column(name = "name", nullable = false, length = 250)
    val name: String,

    @Column(name = "status", nullable = false)
    val status: String,

    @Column(name = "start_date")
    val startDate: LocalDate? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "employer_id",
        nullable = false,
        foreignKey = ForeignKey(name = "fk_employer_id")
    )
    val employer: Employer? = null,

) : Serializable
