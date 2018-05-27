import {Column, Entity, ManyToOne} from 'typeorm';

import BaseEntity from '@entities/BaseEntity';
import { DB1 } from '@modules/Database';
import Definition from '@entities/Definition';

@Entity({ database: DB1 })
export default class Usage extends BaseEntity {
  @Column()
  public label: string;

  @Column({
    default: 'N',
  })
  public status: string;

  @ManyToOne(((type) => Definition))
  public definition: Definition[];
};
