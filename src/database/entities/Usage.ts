import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn, 
} from "typeorm";

import BaseEntity from '@entities/BaseEntity';
import { DB1 } from '@database/db';
import Definition from '@entities/Definition';
import Term from '@entities/Term';
import User from '@entities/User';

@Entity({ database: DB1 })
export default class Usage extends BaseEntity {
  @Column()
  label: string;

  @Column({
    default: 'N',
  })
  status: string;

  // @Column()
  // defId: number;
  @ManyToOne(((type) => Definition))
  definition: Definition[];
};
