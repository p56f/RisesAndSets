package pl.pecet.risesandsets.controllers

import org.springframework.web.bind.annotation.{CrossOrigin, GetMapping, RestController}
import pl.pecet.risesandsets.beans.{DateTimeAndCoordinatesParams, MoonResponseParams}
import pl.pecet.risesandsets.calculators.MoonCalculator

@RestController
@CrossOrigin(origins = Array("${moon.controller.cors.host}"))
class MoonController(moonCalculator: MoonCalculator) {

  @GetMapping(Array("moon"))
  def getMoonriseMoonsetAndPhase(parameters: DateTimeAndCoordinatesParams) : MoonResponseParams = {
    val moonrise = moonCalculator.calculateRise(parameters)
    val moonset = moonCalculator.calculateSet(parameters)
    val phase = moonCalculator.calculatePhase(parameters)
    MoonResponseParams(moonrise.orNull, moonset.orNull, phase.name)
  }
}
