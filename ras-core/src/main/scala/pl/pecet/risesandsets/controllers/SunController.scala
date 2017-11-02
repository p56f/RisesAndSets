package pl.pecet.risesandsets.controllers

import org.springframework.web.bind.annotation.{GetMapping, RestController}
import pl.pecet.risesandsets.beans.DateAndCoardinatesParams
import pl.pecet.risesandsets.calculators.SunCalculator

@RestController
class SunController extends RisesAndSetsController {

  @GetMapping(Array("sunrise"))
  override def rise(parameters: DateAndCoardinatesParams): String = SunCalculator.calculateRise(parameters).toString

  @GetMapping(Array("sunset"))
  override def set(parameters: DateAndCoardinatesParams): String = SunCalculator.calculateSet(parameters).toString

}
