import {Column, Entity} from 'typeorm';

import BaseEntity from '@entities/BaseEntity';
import {DB1} from '@database/db';

@Entity({ database: DB1 })
export default class Origin extends BaseEntity {
  @Column()
  public labelEn: string;

  @Column()
  public status: string;
};
