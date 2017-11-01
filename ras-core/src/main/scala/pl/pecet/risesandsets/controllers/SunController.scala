package pl.pecet.risesandsets.controllers

import org.springframework.web.bind.annotation.{GetMapping, RestController}

@RestController
class SunController extends RisesAndSetsController {

  @GetMapping(Array("sunrise"))
  override def rise(parameters: Parameters) = parameters.toString

  @GetMapping(Array("sunset"))
  override def set(parameters: Parameters) = parameters.toString
}
