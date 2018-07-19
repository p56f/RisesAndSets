package pl.pecet.risesandsets.controllers

import org.springframework.web.bind.annotation.{GetMapping, RestController}
import pl.pecet.risesandsets.beans.{DateAndCoordinatesParams, MoonResponseParams}
import pl.pecet.risesandsets.calculators.MoonCalculator

@RestController
class MoonController {

  @GetMapping(Array("moon"))
  def getMoonriseMoonsetAndPhase(parameters: DateAndCoordinatesParams) : MoonResponseParams = {
    val moonrise = MoonCalculator.calculateRise(parameters)
    val moonset = MoonCalculator.calculateSet(parameters)
    val phase = MoonCalculator.calculatePhase(parameters)
    MoonResponseParams(moonrise.orNull, moonset.orNull, phase.name)
  }
}
