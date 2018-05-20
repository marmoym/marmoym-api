import {Column, Entity} from 'typeorm';

import BaseEntity from '@entities/BaseEntity';
import {DB1} from '@database/db';

@Entity({ database: DB1 })
export default class Term extends BaseEntity {
  @Column()
  public label: string;

  @Column()
  public roman: string;

  @Column()
  public status: string;
  
};
