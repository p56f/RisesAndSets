package pl.pecet.risesandsets.beans

import scala.beans.BeanProperty

case class DateTimeAndCoordinatesParams(
  @BeanProperty var latitude: Double = 0.0d,
  @BeanProperty var longitude: Double = 0.0d,
  @BeanProperty var day: Int = 0,
  @BeanProperty var month: Int = 0,
  @BeanProperty var year: Int = 0,
  @BeanProperty var hour: Int = 0,
  @BeanProperty var minute: Int = 0,
  @BeanProperty var second: Int = 0,
  @BeanProperty var timeOffset: Int = 0) {
  def this() = this(latitude = 0.0d)
}
