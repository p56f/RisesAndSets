package pl.pecet.risesandsets.calculators
import java.time.LocalTime

import pl.pecet.risesandsets.beans.DateAndCoordinatesParams
import pl.pecet.risesandsets.enums.MoonPhase

object MoonCalculator extends Calculator {

  override def calculateRise(parameters: DateAndCoordinatesParams): Option[LocalTime] = Some(LocalTime.now())

  override def calculateSet(parameters: DateAndCoordinatesParams): Option[LocalTime] = Some(LocalTime.now())

  def calculatePhase(parameters: DateAndCoordinatesParams) : MoonPhase.Val = MoonPhase.FullMoon
}
