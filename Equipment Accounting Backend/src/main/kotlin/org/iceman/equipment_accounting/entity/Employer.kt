package org.iceman.equipment_accounting.entity

import jakarta.persistence.*
import java.io.Serializable

@Entity
@Table(name = "employer")
data class Employer(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    val id: Long,

    @Column(name = "name", nullable = false, length = 100)
    val name: String,

    @Column(name = "last_name", nullable = false, length = 100)
    val lastName: String,

    @Column(name = "age", nullable = false)
    val age: Int,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "department_id",
        nullable = false,
        foreignKey = ForeignKey(name = "fk_department_id")
    )
    val department: Department,

    @OneToMany(
        mappedBy = "employer",
        fetch = FetchType.LAZY
    )
    val equipments: List<Equipment>

) : Serializable

