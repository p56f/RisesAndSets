package pl.pecet.risesandsets.controllers

import org.springframework.web.bind.annotation.{CrossOrigin, GetMapping, RestController}
import pl.pecet.risesandsets.beans.{DateAndCoordinatesParams, SunResponseParams}
import pl.pecet.risesandsets.calculators.SunCalculator

@RestController
@CrossOrigin(origins = Array("http://localhost:4200"))
class SunController(sunCalculator: SunCalculator) {

  @GetMapping(Array("sun"))
  def getSunriseAndSunset(parameters: DateAndCoordinatesParams) : SunResponseParams = {
    val sunrise = sunCalculator.calculateRise(parameters)
    val sunset = sunCalculator.calculateSet(parameters)
    val duration = sunCalculator.getDuration(sunrise, sunset)
    val polarDay = sunset.isEmpty
    val polarNight = sunrise.isEmpty
    SunResponseParams(sunrise.orNull, sunset.orNull, duration.orNull, polarDay, polarNight)
  }
}
