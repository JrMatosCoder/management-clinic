import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class user extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV1)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column
  role: string;

  @AllowNull(false)
  @Column
  user: string;

  @AllowNull(false)
  @Column
  password: string;
}
