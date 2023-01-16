import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Contact } from '../contacts/entities/contact.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Contact])],
  controllers: [MessagesController],
  providers: [MessagesService, ConfigService],
})
export class MessagesModule {}
