import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'orders' })
export class ClientEntity extends BaseEntity {}
