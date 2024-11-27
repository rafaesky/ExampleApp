import { Knex } from "knex";
console.log(Knex)
declare module 'knex/types/tables' {
  export interface Tables {
    transactions: {
      id: string,
      session_id?: string,
      title: string,
      amount: number,
      created_at: string
    }
  }
}