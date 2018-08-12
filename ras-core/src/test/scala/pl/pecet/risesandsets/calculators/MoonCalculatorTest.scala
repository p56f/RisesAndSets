package pl.pecet.risesandsets.calculators

import org.scalatest.FunSuite
import pl.pecet.risesandsets.beans.DateTimeAndCoordinatesParams
import pl.pecet.risesandsets.enums.MoonPhase

class MoonCalculatorTest extends FunSuite {

  private val moonCalculator = new MoonCalculator()

  test("New moon (15/05/2018 18:00 UTC)") {
    val params = DateTimeAndCoordinatesParams(day = 15, month = 5, year = 2018, hour = 18)
    assert(moonCalculator.calculatePhase(params) == MoonPhase.NewMoon)
  }

  test("First quarter (24/03/2018 22:00 UTC+1)") {
    val params = DateTimeAndCoordinatesParams(day = 24, month = 3, year = 2018, hour = 22, timeZoneId = "Europe/Warsaw")
    assert(moonCalculator.calculatePhase(params) == MoonPhase.FirstQuarter)
  }

  test("Full moon (27/07/2018 23:00 UTC+2)") {
    val params = DateTimeAndCoordinatesParams(day = 27, month = 7, year = 2018, hour = 23, timeZoneId = "Europe/Warsaw")
    assert(moonCalculator.calculatePhase(params) == MoonPhase.FullMoon)
  }

  test("Last quarter (07/02/2018 16:00 UTC)") {
    val params = DateTimeAndCoordinatesParams(day = 7, month = 2, year = 2018, hour = 16)
    assert(moonCalculator.calculatePhase(params) == MoonPhase.LastQuarter)
  }
}