import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import * as bcrypt from 'bcrypt'
import Evaluation from "../evaluations/entity";

@Entity()
export default class Teacher extends BaseEntity{

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {unique: true})
  email: string

  @Column('text')
  password: string

  @OneToMany(() => Evaluation, e => e.teacher)
  evaluations: Evaluation[]

  async setPassword(pass: string) {
    this.password = await bcrypt.hash(pass, 10)
  }

  checkPassword(pass: string): Promise<boolean> {
    return bcrypt.compare(pass, this.password)
  }

}