name := "ras-core"

version := "0.1"

scalaVersion := "2.12.6"

libraryDependencies ++= Seq(
  "org.springframework.boot" % "spring-boot-starter-web" % "1.5.8.RELEASE",
  "org.scalatest" %% "scalatest" % "3.0.4" % "test",
  "io.springfox" % "springfox-swagger2" % "2.7.0",
  "io.springfox" % "springfox-swagger-ui" % "2.7.0"
)

enablePlugins(JavaAppPackaging)
