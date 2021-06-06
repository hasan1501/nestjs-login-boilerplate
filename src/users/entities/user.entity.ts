import { UUIDV4 } from 'sequelize';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  DataType,
  CreatedAt,
  AllowNull,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export class User extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: UUIDV4 })
  id: string;

  @Column
  first_name: string;

  @Column
  last_name: string;

  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @CreatedAt
  @AllowNull(false)
  @Column
  created_at: Date;

  @UpdatedAt
  @AllowNull(false)
  @Column
  updated_at: Date;
}
