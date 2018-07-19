package pl.pecet.risesandsets.calculators

import java.time.{DateTimeException, LocalTime}

import org.scalatest.FunSuite
import pl.pecet.risesandsets.beans.DateAndCoordinatesParams

class SunCalculatorTest extends FunSuite {

  private val WarsawSummerParams = DateAndCoordinatesParams(latitude = 52.24d, longitude = 21.01d, day = 21, month = 6, year = 2017, timeOffset = 7200)

  private val WarsawWinterParams = DateAndCoordinatesParams(latitude = 52.24d, longitude = 21.01d, day = 22, month = 12, year = 2017, timeOffset = 3600)

  test("Duration between two times should be greater than zero") {
    val start = Some(LocalTime.of(12, 45, 17))
    val stop = Some(LocalTime.of(15, 12, 1))
    val duration = SunCalculator.getDuration(start, stop).get
    assert(duration.getHour == 2)
    assert(duration.getMinute == 26)
    assert(duration.getSecond == 44)
  }

  test("Duration between two times should be greater than zero when sunrise is before midnight") {
    val start = Some(LocalTime.of(23, 37, 40))
    val stop = Some(LocalTime.of(22, 17, 46))
    val duration = SunCalculator.getDuration(start, stop).get
    assert(duration.getHour == 22)
    assert(duration.getMinute == 40)
    assert(duration.getSecond == 6)
  }

  test("Duration between two times should be greater than zero when sunset is after midnight") {
    val start = Some(LocalTime.of(3, 15, 20))
    val stop = Some(LocalTime.of(0, 32, 45))
    val duration = SunCalculator.getDuration(start, stop).get
    assert(duration.getHour == 21)
    assert(duration.getMinute == 17)
    assert(duration.getSecond == 25)
  }

  test("Duration between the same times should equal zero") {
    val start = Some(LocalTime.of(14, 33))
    val stop = Some(LocalTime.of(14, 33))
    val duration = SunCalculator.getDuration(start, stop).get
    assert(duration.getHour == 0)
    assert(duration.getMinute == 0)
    assert(duration.getSecond == 0)
  }

  test("Duration should not be specified when at least one time is not specified") {
    val start = None
    val stop = Some(LocalTime.of(14, 33, 33))
    val duration = SunCalculator.getDuration(start, stop)
    assert(duration.isEmpty)
  }

  test("Sunrise in Warsaw (21/06/2017)") {
    val sunrise = SunCalculator.calculateRise(WarsawSummerParams).get
    assert(sunrise.getHour == 4)
    assert(sunrise.getMinute == 14)
    assert(sunrise.getSecond == 9)
  }

  test("Sunset in Warsaw (21/06/2017)") {
    val sunset = SunCalculator.calculateSet(WarsawSummerParams).get
    assert(sunset.getHour == 21)
    assert(sunset.getMinute == 1)
    assert(sunset.getSecond == 5)
  }

  test("Sunrise in Warsaw (22/12/2017)") {
    val sunrise = SunCalculator.calculateRise(WarsawWinterParams).get
    assert(sunrise.getHour == 7)
    assert(sunrise.getMinute == 43)
    assert(sunrise.getSecond == 22)
  }

  test("Sunset in Warsaw (22/12/2017)") {
    val sunset = SunCalculator.calculateSet(WarsawWinterParams).get
    assert(sunset.getHour == 15)
    assert(sunset.getMinute == 25)
    assert(sunset.getSecond == 27)
  }

  test("Polar day on arctic circle (21/06/2017)") {
    val arcticCircleSummerParams = DateAndCoordinatesParams(latitude = 66.57d, longitude = 0.0d, day = 21, month = 6, year = 2017, timeOffset = 0)
    val sunset = SunCalculator.calculateSet(arcticCircleSummerParams)
    assert(sunset.isEmpty)
  }

  test("Polar night in Kiruna (22/12/2017)") {
    val kirunaWinterParams = DateAndCoordinatesParams(latitude = 67.86d, longitude = 20.26d, day = 22, month = 12, year = 2017, timeOffset = 3600)
    val sunRise = SunCalculator.calculateRise(kirunaWinterParams)
    assert(sunRise.isEmpty)
  }
}
