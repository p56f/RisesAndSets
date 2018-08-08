package pl.pecet.risesandsets.calculators

import java.time.LocalTime

import pl.pecet.risesandsets.beans.DateTimeAndCoordinatesParams

trait Calculator {
  def calculateRise(parameters: DateTimeAndCoordinatesParams) : Option[LocalTime]

  def calculateSet(parameters: DateTimeAndCoordinatesParams) : Option[LocalTime]
}
