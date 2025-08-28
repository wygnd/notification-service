import {Controller, Get} from "@nestjs/common";
import {ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller()
export class AppController {

	@ApiTags("App")
	@ApiResponse({description: "Test route", example: "Hello World!"})
	@Get("/")
	startApp() {
		return "Hello World!";
	}
}