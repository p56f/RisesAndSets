package pl.pecet.risesandsets.beans

import java.time.LocalTime

import scala.beans.BeanProperty

case class MoonResponseParams (
  @BeanProperty moonrise: LocalTime,
  @BeanProperty moonset: LocalTime,
  @BeanProperty phase: String)
