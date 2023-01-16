import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: MongoRepository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const contact = new Contact();
    Object.assign(contact, createContactDto);
    return await this.contactRepository.save(contact);
  }

  async findAll(): Promise<Contact[]> {
    return await this.contactRepository.find();
  }

  async findOne(id: string): Promise<Contact> {
    return await this.contactRepository.findOneBy({
      _id: new ObjectID(id),
    });
  }

  async update(
    id: string,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    const contact = await this.contactRepository.findOneByOrFail({
      _id: new ObjectID(id),
    });
    Object.assign(contact, updateContactDto);
    return await contact.save();
  }

  async remove(id: string): Promise<Contact> {
    const contact = await this.contactRepository.findOneByOrFail({
      _id: new ObjectID(id),
    });
    return await contact.remove();
  }
}
