package pl.pecet.risesandsets.controllers

import org.springframework.web.bind.annotation.{GetMapping, RestController}
import pl.pecet.risesandsets.beans.DateAndCoardinatesParams

@RestController
class SunController extends RisesAndSetsController {

  @GetMapping(Array("sunrise"))
  override def rise(parameters: DateAndCoardinatesParams): String = parameters.toString

  @GetMapping(Array("sunset"))
  override def set(parameters: DateAndCoardinatesParams): String = parameters.toString

}
