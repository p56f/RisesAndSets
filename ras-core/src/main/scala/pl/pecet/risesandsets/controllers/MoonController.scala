package pl.pecet.risesandsets.controllers

import org.springframework.web.bind.annotation.{GetMapping, RestController}
import pl.pecet.risesandsets.beans.DateAndCoardinatesParams

@RestController
class MoonController extends RisesAndSetsController {

  @GetMapping(Array("moonrise"))
  override def rise(parameters: DateAndCoardinatesParams) : String = parameters.toString

  @GetMapping(Array("moonset"))
  override def set(parameters: DateAndCoardinatesParams) : String = parameters.toString
}
