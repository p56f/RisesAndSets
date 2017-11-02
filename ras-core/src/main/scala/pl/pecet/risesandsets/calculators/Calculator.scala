package pl.pecet.risesandsets.calculators

import pl.pecet.risesandsets.beans.DateAndCoardinatesParams

trait Calculator {
  def calculateRise(parameters: DateAndCoardinatesParams) : Int

  def calculateSet(parameters: DateAndCoardinatesParams) : Int
}
