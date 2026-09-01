import {open} from 'react-native-nitro-sqlite';

const db = open({
  name: 'CalculatorHistory',
});

export const initializeDatabase = () => {
  db.execute(`
    CREATE TABLE IF NOT EXISTS calculations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      expression TEXT NOT NULL,
      result TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);
};

export const saveCalculation = (
  expression: string,
  result: string,
) => {
  db.execute(
    `
    INSERT INTO calculations
    (expression, result, created_at)
    VALUES (?, ?, ?)
    `,
    [
      expression,
      result,
      new Date().toISOString(),
    ],
  );
};

export const getCalculations = () => {
  const result = db.execute(
    `
    SELECT *
    FROM calculations
    ORDER BY id DESC
    `,
  );

  return result.rows;
};

export const deleteCalculation = (id: number) => {
  db.execute(
    `DELETE FROM calculations WHERE id = ?`,
    [id],
  );
};

export const clearHistory = () => {
  db.execute(
    `DELETE FROM calculations`,
  );
};