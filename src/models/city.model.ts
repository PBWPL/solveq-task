import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'cities'
})
export class City extends Model {
  @Column({
    type: DataType.MEDIUMINT,
    primaryKey: true,
    autoIncrement: true
  })
  id: number;

  @Column({
    type: DataType.CHAR(30),
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.GEOMETRY('POINT'),
    allowNull: false
  })
  coordinate!: GeoJSON.Point;
}
