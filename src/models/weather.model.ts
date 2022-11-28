import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { City } from './city.model';

@Table({
  timestamps: false,
  tableName: 'weather'
})
export class Weather extends Model {
  @Column({
    type: DataType.MEDIUMINT,
    primaryKey: true,
    autoIncrement: true
  })
  id: number;

  @ForeignKey(() => City)
  @Column({
    type: DataType.MEDIUMINT,
    allowNull: false
  })
  cityId!: number;

  @Column({
    type: DataType.TEXT('long'),
    allowNull: false
  })
  rawData!: string;

  @BelongsTo(() => City)
  city: City;
}
