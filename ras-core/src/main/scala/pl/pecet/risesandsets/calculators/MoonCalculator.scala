package pl.pecet.risesandsets.calculators
import java.time.LocalTime

import org.springframework.stereotype.Service
import pl.pecet.risesandsets.beans.DateAndCoordinatesParams
import pl.pecet.risesandsets.enums.MoonPhase

@Service
class MoonCalculator extends Calculator {

  override def calculateRise(parameters: DateAndCoordinatesParams): Option[LocalTime] = Some(LocalTime.now())

  override def calculateSet(parameters: DateAndCoordinatesParams): Option[LocalTime] = Some(LocalTime.now())

  def calculatePhase(parameters: DateAndCoordinatesParams) : MoonPhase.Val = MoonPhase.FullMoon
}
