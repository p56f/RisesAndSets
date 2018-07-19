package pl.pecet.risesandsets.enums

object MoonPhase {
  sealed trait Val {
     def name = this.getClass.getSimpleName.replace("$", "")
  }

  case object NewMoon extends Val
  case object FirstQuarter extends Val
  case object FullMoon extends Val
  case object LastQuarter extends Val
}
