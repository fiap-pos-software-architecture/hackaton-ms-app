import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IAuth } from '../../../core/domain/Auth';

@Entity()
export class Auth implements IAuth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
