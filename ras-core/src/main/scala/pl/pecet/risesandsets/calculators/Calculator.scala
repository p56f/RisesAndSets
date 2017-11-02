package pl.pecet.risesandsets.calculators

import java.time.LocalTime

import pl.pecet.risesandsets.beans.DateAndCoardinatesParams

trait Calculator {
  def calculateRise(parameters: DateAndCoardinatesParams) : LocalTime

  def calculateSet(parameters: DateAndCoardinatesParams) : LocalTime
}
