package pl.pecet.risesandsets.controllers

import org.springframework.web.bind.annotation.{GetMapping, RestController}
import pl.pecet.risesandsets.beans.DateAndCoardinatesParams

@RestController
class MoonController {

  @GetMapping(Array("moonrise"))
  def rise(parameters: DateAndCoardinatesParams) : String = parameters.toString

  @GetMapping(Array("moonset"))
  def set(parameters: DateAndCoardinatesParams) : String = parameters.toString
}
