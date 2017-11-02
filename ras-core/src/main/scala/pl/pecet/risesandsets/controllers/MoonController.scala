package pl.pecet.risesandsets.controllers

import org.springframework.web.bind.annotation.{GetMapping, RestController}
import pl.pecet.risesandsets.beans.DateAndCoordinatesParams

@RestController
class MoonController {

  @GetMapping(Array("moonrise"))
  def rise(parameters: DateAndCoordinatesParams) : String = parameters.toString

  @GetMapping(Array("moonset"))
  def set(parameters: DateAndCoordinatesParams) : String = parameters.toString
}
