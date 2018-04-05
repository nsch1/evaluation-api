import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {IsDateString, IsString} from "class-validator";
import Student from "../students/entity";
import Teacher from "../users/entity";

@Entity()
export default class Evaluation extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  color: string

  @IsString()
  @Column('text')
  remark: string

  @IsDateString()
  @Column('date')
  date: Date

  @ManyToOne(() => Student, s => s.evaluations, {onDelete: 'CASCADE'})
  student: Student

  @ManyToOne(() => Teacher, t => t.evaluations)
  teacher: Teacher

}