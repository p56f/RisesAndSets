package pl.pecet.risesandsets.calculators

import java.time.{DateTimeException, LocalTime}

import org.scalatest.FunSuite

class SunCalculatorTest extends FunSuite {

  test("Duration between two times should be greater than zero") {
    val start = Some(LocalTime.of(12, 45, 17))
    val stop = Some(LocalTime.of(15, 12, 1))
    val duration = SunCalculator.getDuration(start, stop).get
    assert(duration.getHour == 2)
    assert(duration.getMinute == 26)
    assert(duration.getSecond == 44)
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

  test("Exception should be throws when start time is later then stop time") {
    val start = Some(LocalTime.of(20, 7, 43))
    val stop = Some(LocalTime.of(13, 30, 12))
    assertThrows[DateTimeException] {
      SunCalculator.getDuration(start, stop)
    }
  }
}
