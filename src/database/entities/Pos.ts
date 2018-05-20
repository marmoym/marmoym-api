import {Column, Entity,} from 'typeorm';

import BaseEntity from '@entities/BaseEntity';
import {DB1} from '@database/db';

@Entity({ database: DB1 })
export default class Pos extends BaseEntity {
  @Column()
  public label: string;

  @Column({
    nullable: true,
  })
  public labelEn: string;

  @Column({
    default: 'N',
  })
  public status: string;
};
