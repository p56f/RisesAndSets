package pl.pecet.risesandsets.config

import org.springframework.context.annotation.{Bean, Configuration}
import springfox.documentation.builders.{PathSelectors, RequestHandlerSelectors}
import springfox.documentation.service.{ApiInfo, Contact, VendorExtension}
import springfox.documentation.spi.DocumentationType
import springfox.documentation.spring.web.plugins.Docket
import springfox.documentation.swagger2.annotations.EnableSwagger2

import scala.collection.JavaConverters._
import scala.collection.mutable.ArrayBuffer

@Configuration
@EnableSwagger2
class SwaggerConfig {

  @Bean
  def api() : Docket = new Docket(DocumentationType.SWAGGER_2)
      .select()
      .apis(RequestHandlerSelectors.basePackage("pl.pecet.risesandsets.controllers"))
      .paths(PathSelectors.any())
      .build()
      .apiInfo(apiInfo())

  private def apiInfo() = new ApiInfo("RisesAndSets REST API",
    "The REST API for calculation sun and moon related data (for example sunrises, sunsets, moon phases)",
    "1.0", "", new Contact("Pawel Pecet", "", ""), "", "", ArrayBuffer[VendorExtension[_]]().asJava)
}
