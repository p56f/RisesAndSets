package pl.pecet.risesandsets.calculators

import java.time.LocalTime

import org.scalatest.FunSuite
import pl.pecet.risesandsets.beans.DateTimeAndCoordinatesParams
import pl.pecet.risesandsets.calculators.SunCalculatorTest._

class SunCalculatorTest extends FunSuite {

  private val sunCalculator = new SunCalculator()

  test("Duration between two times should be greater than zero") {
    val start = Some(LocalTime.of(12, 45, 17))
    val stop = Some(LocalTime.of(15, 12, 1))
    val duration = sunCalculator.getDuration(start, stop).get
    assert(duration.getHour == 2)
    assert(duration.getMinute == 26)
    assert(duration.getSecond == 44)
  }

  test("Duration between two times should be greater than zero when sunrise is before midnight") {
    val start = Some(LocalTime.of(23, 37, 40))
    val stop = Some(LocalTime.of(22, 17, 46))
    val duration = sunCalculator.getDuration(start, stop).get
    assert(duration.getHour == 22)
    assert(duration.getMinute == 40)
    assert(duration.getSecond == 6)
  }

  test("Duration between two times should be greater than zero when sunset is after midnight") {
    val start = Some(LocalTime.of(3, 15, 20))
    val stop = Some(LocalTime.of(0, 32, 45))
    val duration = sunCalculator.getDuration(start, stop).get
    assert(duration.getHour == 21)
    assert(duration.getMinute == 17)
    assert(duration.getSecond == 25)
  }

  test("Duration between the same times should equal zero") {
    val start = Some(LocalTime.of(14, 33))
    val stop = Some(LocalTime.of(14, 33))
    val duration = sunCalculator.getDuration(start, stop).get
    assert(duration.getHour == 0)
    assert(duration.getMinute == 0)
    assert(duration.getSecond == 0)
  }

  test("Duration should not be specified when at least one time is not specified") {
    val start = None
    val stop = Some(LocalTime.of(14, 33, 33))
    val duration = sunCalculator.getDuration(start, stop)
    assert(duration.isEmpty)
  }

  test("Sunrise in Warsaw (21/06/2017)") {
    val sunrise = sunCalculator.calculateRise(warsawSummerParams).get
    assert(sunrise.getHour == 4)
    assert(sunrise.getMinute == 14)
    assert(sunrise.getSecond == 9)
  }

  test("Sunset in Warsaw (21/06/2017)") {
    val sunset = sunCalculator.calculateSet(warsawSummerParams).get
    assert(sunset.getHour == 21)
    assert(sunset.getMinute == 1)
    assert(sunset.getSecond == 5)
  }

  test("Sunrise in Warsaw (22/12/2017)") {
    val sunrise = sunCalculator.calculateRise(warsawWinterParams).get
    assert(sunrise.getHour == 7)
    assert(sunrise.getMinute == 43)
    assert(sunrise.getSecond == 22)
  }

  test("Sunset in Warsaw (22/12/2017)") {
    val sunset = sunCalculator.calculateSet(warsawWinterParams).get
    assert(sunset.getHour == 15)
    assert(sunset.getMinute == 25)
    assert(sunset.getSecond == 27)
  }

  test("Polar day on arctic circle (21/06/2017)") {
    val arcticCircleSummerParams = DateTimeAndCoordinatesParams(latitude = 66.57d, longitude = 0.0d, day = 21, month = 6, year = 2017, timeOffset = 0)
    val sunset = sunCalculator.calculateSet(arcticCircleSummerParams)
    assert(sunset.isEmpty)
  }

  test("Polar night in Kiruna (22/12/2017)") {
    val kirunaWinterParams = DateTimeAndCoordinatesParams(latitude = 67.86d, longitude = 20.26d, day = 22, month = 12, year = 2017, timeOffset = 3600)
    val sunRise = sunCalculator.calculateRise(kirunaWinterParams)
    assert(sunRise.isEmpty)
  }
}


object SunCalculatorTest {
  private final val warsawSummerParams = DateTimeAndCoordinatesParams(latitude = 52.24d, longitude = 21.01d, day = 21, month = 6, year = 2017, timeOffset = 7200)

  private final val warsawWinterParams = DateTimeAndCoordinatesParams(latitude = 52.24d, longitude = 21.01d, day = 22, month = 12, year = 2017, timeOffset = 3600)
}