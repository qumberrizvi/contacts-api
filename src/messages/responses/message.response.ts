import { ApiProperty } from '@nestjs/swagger';
import { ContactResponse } from '../../contacts/responses/contact.response';

export class MessageResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  otp: number;

  @ApiProperty({ nullable: true })
  contact?: ContactResponse;

  @ApiProperty()
  createdAt: Date;
}
