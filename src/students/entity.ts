import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsString, IsUrl} from "class-validator";

@Entity()
export default class Student {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  name: string

  @IsUrl()
  @Column('text')
  picture: string

}