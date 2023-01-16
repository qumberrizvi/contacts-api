import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { IsNull, MongoRepository, Not } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Contact } from '../contacts/entities/contact.entity';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class MessagesService {
  private twilioClient: Twilio;

  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: MongoRepository<Message>,
    @InjectRepository(Contact)
    private readonly contactRepository: MongoRepository<Contact>,
    private readonly configService: ConfigService,
  ) {
    const accountSid = configService.get('TWILIO_ACCOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const contact = await this.contactRepository.findOneByOrFail({
      _id: new ObjectID(createMessageDto.contactId),
    });
    await this.twilioClient.messages.create({
      from: this.configService.get('TWILIO_FROM_PHONE'),
      to: contact.phone,
      body: createMessageDto.body,
    });
    const message = new Message();
    message.contactId = new ObjectID(createMessageDto.contactId);
    message.otp = createMessageDto.otp;
    return await this.messageRepository.save(message);
  }

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Message> {
    return await this.messageRepository.findOneBy({
      _id: new ObjectID(id),
    });
  }
}
