import {ApiProperty} from "@nestjs/swagger";

interface IResponseError {
	message: string;
	error: string;
	statusCode: number;
}

export class ErrorResponseDto {
	@ApiProperty({
		example: {
			message: "Notification not found.",
			error: "Not Found",
			statusCode: 404
		},
	})
	response: IResponseError;
	@ApiProperty({
		example: 404,
	})
	status: number;
	@ApiProperty({
		example: [],
	})
	options: string[];
	@ApiProperty({
		example: "Notification not found.",
	})
	message: string;
	@ApiProperty({
		example: "NotFoundException",
	})
	name: string;
}