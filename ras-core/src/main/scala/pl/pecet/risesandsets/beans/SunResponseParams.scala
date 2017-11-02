package pl.pecet.risesandsets.beans

import java.time.LocalTime

import scala.beans.BeanProperty

case class SunResponseParams(
  @BeanProperty sunrise: LocalTime,
  @BeanProperty sunset: LocalTime,
  @BeanProperty duration: LocalTime,
  @BeanProperty polarDay: Boolean,
  @BeanProperty polarNight: Boolean)
