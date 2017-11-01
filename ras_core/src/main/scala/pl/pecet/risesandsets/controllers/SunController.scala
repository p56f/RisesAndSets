package pl.pecet.risesandsets.controllers

import org.springframework.web.bind.annotation.{GetMapping, RestController}

@RestController
class SunController extends RisesAndSetsController {

  @GetMapping(Array("sunrise"))
  override def rise() = "sunrise"

  @GetMapping(Array("sunset"))
  override def set() = "sunset"
}
