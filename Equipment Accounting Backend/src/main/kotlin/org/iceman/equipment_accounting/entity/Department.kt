package org.iceman.equipment_accounting.entity

import com.fasterxml.jackson.annotation.JsonManagedReference
import jakarta.persistence.*
import java.io.Serializable

@Entity
@Table(name = "department")
data class Department(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    val id: Long? = null,

    @Column(name = "name", nullable = false, length = 150)
    val name: String,

    @OneToMany(
        mappedBy = "department",
        fetch = FetchType.LAZY
    )
    @JsonManagedReference
    val employers: List<Employer>
) : Serializable
