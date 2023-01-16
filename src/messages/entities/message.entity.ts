import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';
import { Contact } from '../../contacts/entities/contact.entity';

@Entity()
export class Message {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  otp: number;

  @ObjectIdColumn({ nullable: false, name: 'contactId' })
  contactId: ObjectID;

  contact?: Contact;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
