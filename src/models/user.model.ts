import { Table, Model, Column, DataType, BelongsToMany, ForeignKey } from 'sequelize-typescript';
import { City } from './city.model';

@Table({
  timestamps: false,
  tableName: 'users'
})
export class User extends Model {
  @Column({
    type: DataType.MEDIUMINT,
    primaryKey: true,
    autoIncrement: true
  })
  id: number;

  @Column({
    type: DataType.CHAR(30),
    allowNull: false,
    unique: true
  })
  username!: string;

  @Column({
    type: DataType.CHAR(30),
    allowNull: false
  })
  password!: string;

  @BelongsToMany(() => City, () => UserCity)
  cities: City[];
}

@Table({
  timestamps: false,
  tableName: 'users_cities'
})
export class UserCity extends Model {
  @Column({
    type: DataType.MEDIUMINT,
    primaryKey: true,
    autoIncrement: true
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.MEDIUMINT,
    allowNull: false
  })
  userId!: number;

  @ForeignKey(() => City)
  @Column({
    type: DataType.MEDIUMINT,
    allowNull: false
  })
  cityId!: number;
}
