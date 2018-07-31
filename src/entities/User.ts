import { Column, Entity, Index } from 'typeorm';

import { DB1 } from '@modules/Database';
import BaseEntity from '@entities/BaseEntity';

@Entity({ database: DB1 })
export default class User extends BaseEntity {
  @Column()
  @Index({
    unique: true,
  })
  public username: string;

  @Column({
    select: false,
  })
  public password: string;

  @Column()
  @Index({
    unique: true,
  })
  public email: string;

  @Column({
    default: 0,
  })
  public karma?: number;

  @Column({
    default: 'N',
  })
  public status?: string;

  constructor(param?: {
    email,
    id?,
    karma?,
    password,
    status?,
    username,
  }) {
    super();
    if (param) {
      this.email = param.email;
      this.id = param.id;
      this.karma = param.karma;
      this.password = param.password;
      this.status = param.status;
      this.username = param.username;
    }
  }
};
