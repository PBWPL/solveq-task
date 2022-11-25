import { Table, Model, Column, DataType } from 'sequelize-typescript';

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
}
