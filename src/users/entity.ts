import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm"
import * as bcrypt from 'bcrypt'

@Entity()
export default class User extends BaseEntity{

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {unique: true})
  email: string

  @Column('text')
  password: string

  async setPassword(pass: string) {
    const hash = await bcrypt.hash(pass, 10)
    this.password = hash
  }

  checkPassword(pass: string): Promise<boolean> {
    return bcrypt.compare(pass, this.password)
  }

}