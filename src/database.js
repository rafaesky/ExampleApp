import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)
export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf-8')
      .then(data => { this.#database = JSON.parse(data) })
      .catch(() => { this.#persist() })
  }
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }
    this.#persist();
    return data;
  }

  update(table, id, data) {
    const rowIdx = this.#database[table].findIndex(row => row.id == id);
    if (rowIdx > -1) {
      this.#database[table][rowIdx] = { id, ...data }
      this.#persist()
    }
  }

  select(table, search) {
    let data = this.#database[table] ?? []
    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }
    return data
  }

  delete(table, id) {
    const rowIdx = this.#database[table].findIndex(row => row.id == id);
    if (rowIdx > -1) {
      this.#database[table].splice(rowIdx, 1)
      this.#persist()
    }

  }
}