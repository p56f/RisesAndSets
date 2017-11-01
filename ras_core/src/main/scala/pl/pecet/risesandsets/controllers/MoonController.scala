package pl.pecet.risesandsets.controllers

import org.springframework.web.bind.annotation.{GetMapping, RestController}

@RestController
class MoonController extends RisesAndSetsController {

  @GetMapping(Array("moonrise"))
  override def rise() = "moonrise"

  @GetMapping(Array("moonset"))
  override def set() = "moonset"
}
