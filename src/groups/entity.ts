import {Column, Entity, PrimaryColumn, PrimaryColumn} from "typeorm";
import {IsDateString} from "class-validator";

@Entity()
export default class Group {

  @PrimaryColumn('integer')
  id: number

  @IsDateString()
  @Column('date')
  startDate: Date

  @IsDateString()
  @Column('date')
  endDate: Date

}