import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Contact } from './entities/contact.entity';
import { ContactResponse } from './responses/contact.response';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @ApiCreatedResponse({
    description: 'Contact created',
    type: ContactResponse,
  })
  @Post()
  create(@Body() createContactDto: CreateContactDto): Promise<Contact> {
    return this.contactsService.create(createContactDto);
  }

  @ApiOkResponse({
    type: [ContactResponse],
    description: 'Contacts fetched.',
  })
  @Get()
  findAll(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }

  @ApiOkResponse({
    type: ContactResponse,
    description: 'Single contact fetched',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Contact> {
    return this.contactsService.findOne(id);
  }

  @ApiOkResponse({
    type: ContactResponse,
    description: 'Contact updated',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    return this.contactsService.update(id, updateContactDto);
  }

  @ApiOkResponse({
    type: ContactResponse,
    description: 'Contact deleted',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Contact> {
    return this.contactsService.remove(id);
  }
}
