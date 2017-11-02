package pl.pecet.risesandsets.controllers

import pl.pecet.risesandsets.beans.DateAndCoardinatesParams

trait RisesAndSetsController {

  def rise(parameters: DateAndCoardinatesParams) : String

  def set(parameters: DateAndCoardinatesParams) : String
}
