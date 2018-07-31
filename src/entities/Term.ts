import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';

import BaseEntity from '@entities/BaseEntity';
import { DB1 } from '@modules/Database';
import User from '@entities/User';

@Entity({ database: DB1 })
export default class Term extends BaseEntity {
  @Column()
  public label: string;

  @Column({
    nullable: true,
  })
  public roman?: string;

  @Column({
    default: 'N',
  })
  public status?: string;

  constructor(param?: {
    id,
    label,
    roman?,
    status?,
  }) {
    super();
    if (param) {
      this.id = param.id;
      this.label = param.label;
      this.roman = param.roman;
      this.status = param.status;
    }
  }
};
