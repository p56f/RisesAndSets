package pl.pecet.risesandsets.calculators

import java.time.LocalTime

import pl.pecet.risesandsets.beans.DateAndCoardinatesParams

trait Calculator {
  def calculateRise(parameters: DateAndCoardinatesParams) : Option[LocalTime]

  def calculateSet(parameters: DateAndCoardinatesParams) : Option[LocalTime]
}
