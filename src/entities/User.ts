import {Column, Entity} from 'typeorm';


import { DB1 } from '@modules/Database';
import BaseEntity from '@entities/BaseEntity';

@Entity({ database: DB1 })
export default class User extends BaseEntity {

  @Column()
  public username: string;

  @Column()
  public password: string;

  @Column()
  public email: string;

  @Column()
  public karma: number;

  @Column({
    default: 'N',
  })
  public status: string;
};
