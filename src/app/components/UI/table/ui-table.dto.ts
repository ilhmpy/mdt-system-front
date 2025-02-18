export type ColumnFieldTypes = "date" | "marking" | "status"

export interface Column {
  label?: string;
  field?: string;
  type?: ColumnFieldTypes
}

export interface Value {
    [key: string]: any
}