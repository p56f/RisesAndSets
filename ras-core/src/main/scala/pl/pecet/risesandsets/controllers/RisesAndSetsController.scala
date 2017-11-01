package pl.pecet.risesandsets.controllers

trait RisesAndSetsController {

  def rise(parameters: Parameters) : String

  def set(parameters: Parameters) : String
}
