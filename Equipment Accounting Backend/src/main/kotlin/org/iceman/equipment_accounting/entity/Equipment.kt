package org.iceman.equipment_accounting.entity

import com.fasterxml.jackson.annotation.JsonBackReference
import jakarta.persistence.*
import java.io.Serializable
import java.time.LocalDate

@Entity
@Table(name = "equipment")
data class Equipment(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    val id: Long? = null,

    @Column(name = "name", nullable = false, length = 250)
    var name: String? = null,

    @Column(name = "status", nullable = false)
    var status: String? = null,

    @Column(name = "start_date")
    var startDate: LocalDate? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employer_id", nullable = false)
    @JsonBackReference
    var employer: Employer? = null,
) : Serializable