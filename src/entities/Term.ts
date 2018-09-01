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
    label,
    roman?,
    status?,
  }) {
    super();
    this.label = param && param.label;
    this.roman = param && param.roman;
    this.status = param && param.status;
  }
};
