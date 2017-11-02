package pl.pecet.risesandsets.calculators

import java.time.LocalTime

import pl.pecet.risesandsets.beans.DateAndCoordinatesParams

trait Calculator {
  def calculateRise(parameters: DateAndCoordinatesParams) : Option[LocalTime]

  def calculateSet(parameters: DateAndCoordinatesParams) : Option[LocalTime]
}
