import { ApiProperty } from '@nestjs/swagger';
import {
  Contains,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ required: true })
  contactId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(100000)
  @Max(999999)
  @ApiProperty({ required: true })
  otp: number;

  @IsNotEmpty()
  @IsString()
  @Length(24, 24)
  @Contains('Hi. Your OTP is:')
  @ApiProperty({ required: true })
  body: string;
}
