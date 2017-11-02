package pl.pecet.risesandsets.beans

import scala.beans.BeanProperty

case class DateAndCoordinatesParams(
  @BeanProperty var latitude: Double,
  @BeanProperty var longitude: Double,
  @BeanProperty var day: Int,
  @BeanProperty var month: Int,
  @BeanProperty var year: Int,
  @BeanProperty var timeZone: String) {
  def this() = this(0.0d, 0.0d, 0, 0, 0, null)
}
