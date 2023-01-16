import { ApiProperty } from '@nestjs/swagger';

export class MessageResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  otp: number;

  @ApiProperty()
  createdAt: Date;
}
