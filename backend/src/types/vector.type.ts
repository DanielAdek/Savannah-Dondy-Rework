import { ColumnType } from "typeorm";

export class VectorType {
  static readonly type: ColumnType = "vector" as ColumnType;
}