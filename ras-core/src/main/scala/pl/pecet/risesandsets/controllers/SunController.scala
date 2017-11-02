package pl.pecet.risesandsets.controllers

import java.time.temporal.ChronoUnit
import java.time.{Duration, LocalTime}

import org.springframework.web.bind.annotation.{GetMapping, RestController}
import pl.pecet.risesandsets.beans.{DateAndCoordinatesParams, SunResponseParams}
import pl.pecet.risesandsets.calculators.SunCalculator

@RestController
class SunController {

  @GetMapping(Array("sun"))
  def getSunriseAndSunset(parameters: DateAndCoordinatesParams) : SunResponseParams = {
    val sunrise = SunCalculator.calculateRise(parameters)
    val sunset = SunCalculator.calculateSet(parameters)
    val duration = SunCalculator.getDuration(sunrise, sunset)
    val polarDay = sunset.isEmpty
    val polarNight = sunrise.isEmpty
    SunResponseParams(sunrise.orNull, sunset.orNull, duration.orNull, polarDay, polarNight)
  }
}
