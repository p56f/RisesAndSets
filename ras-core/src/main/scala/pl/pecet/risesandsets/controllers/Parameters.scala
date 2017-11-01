package pl.pecet.risesandsets.controllers

import scala.beans.BeanProperty

class Parameters {
  @BeanProperty
  var latitude: Double = _

  @BeanProperty
  var longitude: Double = _

  @BeanProperty
  var day: Int = _

  @BeanProperty
  var month: Int = _

  @BeanProperty
  var year: Int = _

  @BeanProperty
  var timeZone: String = _

  override def toString: String = {
    new StringBuilder()
      .append("[latitude= ").append(latitude)
      .append(", longitude=").append(longitude)
      .append(", day=").append(day)
      .append(", month=").append(month)
      .append(", year=").append(year)
      .append(", timeZone=").append(timeZone)
      .append("]")
      .toString()
  }
}
