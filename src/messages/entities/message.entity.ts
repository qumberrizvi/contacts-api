import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';

@Entity()
export class Message {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  otp: number;

  @ObjectIdColumn({ nullable: false })
  contactId: ObjectID;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
