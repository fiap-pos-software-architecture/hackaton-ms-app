import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { CATEGORIES, IProduct } from '../../../core/domain/Product';
// import { OrderProduct } from './OrderProduct';
import { IUpload } from '../../../core/domain/Upload';

@Entity()
export class Upload implements IUpload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  data: any;

  // @Column()
  // description: string;

  // @Column({ type: 'float' })
  // price: number;

  // @Column({
  //   type: 'enum',
  //   enum: CATEGORIES,
  // })
  // category: CATEGORIES;

  // @OneToMany(() => OrderProduct, (OrderProduct) => OrderProduct.product)
  // OrderProducts: OrderProduct[];
}
