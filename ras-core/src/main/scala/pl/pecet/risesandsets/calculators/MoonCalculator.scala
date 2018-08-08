package pl.pecet.risesandsets.calculators
import java.time.temporal.JulianFields
import java.time._

import org.springframework.stereotype.Service
import pl.pecet.risesandsets.beans.DateTimeAndCoordinatesParams
import pl.pecet.risesandsets.enums.MoonPhase

import MoonCalculator._

@Service
class MoonCalculator extends Calculator {

  override def calculateRise(parameters: DateTimeAndCoordinatesParams): Option[LocalTime] = {
    Some(LocalTime.of(parameters.hour, parameters.minute, parameters.second))
  }

  override def calculateSet(parameters: DateTimeAndCoordinatesParams): Option[LocalTime] = {
    Some(LocalTime.of(parameters.hour, parameters.minute, parameters.second))
  }

  def calculatePhase(parameters: DateTimeAndCoordinatesParams) : MoonPhase.Val = {
    val localDate = LocalDate.of(parameters.year, parameters.month, parameters.day)
    val localTime = LocalTime.of(parameters.hour, parameters.minute, parameters.second)
    val zonedDate = ZonedDateTime.of(localDate, localTime, ZoneId.of(parameters.timeZoneId))

    calculateMoonPhase(zonedDate)
  }

  private def calculateMoonPhase(date: ZonedDateTime) = {
    val moonAge = calculateMoonAge(date)

    if (moonAge < 7) {
      MoonPhase.NewMoon
    } else if (moonAge < 15) {
      MoonPhase.FirstQuarter
    } else if (moonAge < 22) {
      MoonPhase.FullMoon
    } else {
      MoonPhase.LastQuarter
    }
  }

  private def calculateMoonAge(date: ZonedDateTime) = {
    (((calculateJulianDay(date) - StartJulianDay) /  MoonCycleLength) % 1) * MoonCycleLength
  }

  private def calculateJulianDay(date: ZonedDateTime) = {
    val utcDate = date.withZoneSameInstant(ZoneOffset.UTC)
    val noonJulianDay = JulianFields.JULIAN_DAY.getFrom(utcDate)
    val secondOfDay = utcDate.toLocalTime.toSecondOfDay.toDouble

    noonJulianDay + secondOfDay / SecondsInDay - 0.5
  }
}

object MoonCalculator {
  private final val SecondsInDay = Duration.ofDays(1).getSeconds

  private final val StartJulianDay = 2451549.5d

  private final val MoonCycleLength = 29.53d
}