package pl.pecet.risesandsets.calculators

import java.lang.Math._
import java.time.temporal.ChronoUnit
import java.time.{Duration, LocalDate, LocalTime}

import org.springframework.stereotype.Service
import pl.pecet.risesandsets.beans.DateTimeAndCoordinatesParams

import SunCalculator._

@Service
class SunCalculator extends Calculator {

  override def calculateRise(parameters: DateTimeAndCoordinatesParams) : Option[LocalTime] = {
    calculateTime(parameters, rising = true)
  }

  override def calculateSet(parameters: DateTimeAndCoordinatesParams) : Option[LocalTime] = {
    calculateTime(parameters, rising = false)
  }

  def getDuration(start: Option[LocalTime], stop: Option[LocalTime]) : Option[LocalTime] = {
    start.flatMap {
      t1 => stop.flatMap {
        t2 => {
          if (t1.isAfter(t2)) {
            Some(LocalTime.ofSecondOfDay(SecondsInDay - t1.toSecondOfDay
              + ChronoUnit.SECONDS.between(LocalTime.MIDNIGHT, t2)))
          } else {
            Some(LocalTime.ofSecondOfDay(ChronoUnit.SECONDS.between(t1, t2)))
          }
        }
      }
    }
  }

  private def calculateTime(parameters: DateTimeAndCoordinatesParams, rising: Boolean) = {
    val dayOfYear = getDayOfYear(parameters.day, parameters.month, parameters.year)
    val lngHour = calculateLngHour(parameters.longitude)
    val t = calculateApproximateTime(dayOfYear, lngHour, rising)
    val sunLongitude = calculateSunLongitude(t)
    val localTime = calculateHours(sunLongitude, lngHour, parameters.latitude, rising) + calculateRightAscension(sunLongitude) - (0.06571 * t) - 6.622
    convertToSeconds(normalizeHour(localTime - lngHour), parameters.timeOffset).map(LocalTime.ofSecondOfDay)
  }

  private def getDayOfYear(day: Int, month: Int, year: Int) = {
    LocalDate.of(year, month, day).getDayOfYear
  }

  private def calculateLngHour(longitude: Double) = longitude / 15

  private def calculateApproximateTime(dayOfYear: Int, lngHour: Double, rising: Boolean) = {
    val h = if (rising) 6 else 18
    dayOfYear + ((h - lngHour) / 24)
  }

  private def calculateSunLongitude(time: Double) = {
    val sunMeanAnomaly = (0.9856 * time) - 3.289
    normalizeAngle(sunMeanAnomaly + (1.916 * sin(toRadians(sunMeanAnomaly))) + (0.02 * sin(2 * toRadians(sunMeanAnomaly))) + 282.634)
  }

  private def calculateRightAscension(sunLongitude: Double) = {
    val sunRightAscension = normalizeAngle(toDegrees(atan(0.91764 * tan(toRadians(sunLongitude)))))
    val lquadrant  = floor(sunLongitude / 90) * 90
    val raquadrant = floor(sunRightAscension / 90) * 90
    (sunRightAscension + lquadrant - raquadrant) / 15
  }

  private def calculateHours(sunLongitude: Double, rightAscension: Double, latitude: Double, rising: Boolean) : Double = {
    val sinDec = 0.39782 * sin(toRadians(sunLongitude))
    val cosDec = cos(asin(sinDec))
    val zenith = 90 + (50.0 / 60.0)
    val cosH = (cos(toRadians(zenith)) - (sinDec * sin(toRadians(latitude)))) / (cosDec * cos(toRadians(latitude)))

    if (rising) {
      if (cosH > 1) Double.NegativeInfinity else (360 - toDegrees(acos(cosH))) / 15
    } else {
      if (cosH < -1) Double.PositiveInfinity else toDegrees(acos(cosH)) / 15
    }
  }

  private def normalizeAngle(angle: Double) = {
    if (angle > 360) {
      angle - 360
    } else if (angle < 0) {
      angle + 360
    } else {
      angle
    }
  }

  private def normalizeHour(hour: Double) = {
    if (hour >= 24) {
      hour - 24
    } else if (hour < 0) {
      hour + 24
    } else {
      hour
    }
  }

  private def convertToSeconds(time: Double, timeOffset: Int) = time match {
    case Double.NegativeInfinity
         | Double.PositiveInfinity
         | Double.NaN => None
    case _ => {
      val timeInSeconds = (time * 3600).toLong + timeOffset
      if (timeInSeconds >= 0) Some(timeInSeconds % SecondsInDay) else Some(SecondsInDay + timeInSeconds)
    }
  }
}

object SunCalculator {
  private final val SecondsInDay = Duration.ofDays(1).getSeconds
}