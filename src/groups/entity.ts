import {BaseEntity, Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {IsDateString, IsInt} from "class-validator";
import Student from "../students/entity";

@Entity()
export default class Group extends BaseEntity {

  @IsInt()
  @PrimaryColumn('integer')
  id: number

  @IsDateString()
  @Column('date')
  startDate: Date

  @IsDateString()
  @Column('date')
  endDate: Date

  @OneToMany(() => Student, s => s.group)
  students: Student[]

}