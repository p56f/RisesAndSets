package pl.pecet.risesandsets.controllers

import org.springframework.web.bind.annotation.{GetMapping, RestController}
import pl.pecet.risesandsets.beans.DateAndCoardinatesParams
import pl.pecet.risesandsets.calculators.SunCalculator

@RestController
class SunController extends RisesAndSetsController {

  @GetMapping(Array("sunrise"))
  override def rise(parameters: DateAndCoardinatesParams): String = {
    val sunrise = SunCalculator.calculateRise(parameters)
    sunrise match {
      case None => "------------"
      case Some(t) => t.toString
    }
  }

  @GetMapping(Array("sunset"))
  override def set(parameters: DateAndCoardinatesParams): String = {
    val sunset = SunCalculator.calculateSet(parameters)
    sunset match {
      case None => "------------"
      case Some(t) => t.toString
    }
  }
}
