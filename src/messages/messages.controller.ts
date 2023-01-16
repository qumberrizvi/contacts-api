import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Message } from './entities/message.entity';
import { MessageResponse } from './responses/message.response';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @ApiCreatedResponse({
    description: 'Message sent successfully',
    type: MessageResponse,
  })
  @Post()
  create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messagesService.create(createMessageDto);
  }

  @ApiOkResponse({
    description: 'Messages fetched',
    type: [MessageResponse],
  })
  @Get()
  findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }

  @ApiOkResponse({
    description: 'Single message fetched',
    type: MessageResponse,
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Message> {
    return this.messagesService.findOne(id);
  }
}
