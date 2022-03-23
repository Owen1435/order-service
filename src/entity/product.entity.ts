import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
  })
  title: string;
}
