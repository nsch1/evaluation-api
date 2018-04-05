import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId} from "typeorm";
import {IsString, IsUrl} from "class-validator";
import Evaluation from "../evaluations/entity";
import Group from "../groups/entity";

@Entity()
export default class Student extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  name: string

  @IsUrl()
  @Column('text')
  picture: string

  @OneToMany(() => Evaluation, e => e.student)
  evaluations: Evaluation[]

  @ManyToOne(() => Group, g => g.students)
  group: Group

  @RelationId((student: Student) => student.group)
  groupId: number

}