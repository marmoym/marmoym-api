// import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne} from 'typeorm';

// import BaseEntity from '@entities/BaseEntity';
// import { DB1 } from '@modules/Database';
// import Term from '@entities/Term';
// import User from '@entities/User';
// import Vote from '@entities/Vote';

// @Entity({ database: DB1 })
// export default class Definition extends BaseEntity {
//   @Column()
//   public label: string;
  
//   @Column({
//     default: 'N',
//   })
//   public status?: string;
  
//   @ManyToOne((type) => Term, {
//     cascade: true,
//     eager: true,
//   })
//   @JoinColumn({
//     name: 'termId',
//   })
//   public term?: Term;

//   @ManyToOne((type) => User, {
//     eager: true,
//   })
//   @JoinColumn({
//     name: 'userId',
//   })
//   public user?: User;

//   @OneToOne((type) => Vote, {
//     cascade: true,
//     eager: true,
//   })
//   @JoinColumn({
//     name: 'voteId',
//   })
//   public vote: Vote;

//   constructor(param?: {
//     label,
//     term?,
//     user?,
//   }) {
//     super();
//     if (param) {
//       this.label = param.label;
//       this.term = param.term;
//       this.user = param.user;
//     }
//   }
// };

// interface DefinitionParam {
   
// }
