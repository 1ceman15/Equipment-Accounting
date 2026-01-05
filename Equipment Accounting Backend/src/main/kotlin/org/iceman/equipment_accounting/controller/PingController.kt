package org.iceman.equipment_accounting.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1")
class PingController {
    @GetMapping("/ping")
    fun ping(): String {
        return "Pong!"
    }
}