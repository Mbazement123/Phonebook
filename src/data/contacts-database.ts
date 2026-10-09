import type { SQLiteDatabase } from 'expo-sqlite';

export type StoredContact = {
  id: string;
  name: string;
  phone: string;
  email: string;
};

export async function initializeContactsDatabase(database: SQLiteDatabase) {
  await database.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS contacts (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL DEFAULT ''
    );
  `);
}

export async function getStoredContacts(database: SQLiteDatabase) {
  return database.getAllAsync<StoredContact>(
    'SELECT id, name, phone, email FROM contacts ORDER BY name COLLATE NOCASE',
  );
}

export async function saveStoredContact(
  database: SQLiteDatabase,
  contact: StoredContact,
) {
  await database.runAsync(
    `INSERT INTO contacts (id, name, phone, email)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       name = excluded.name,
       phone = excluded.phone,
       email = excluded.email`,
    contact.id,
    contact.name,
    contact.phone,
    contact.email,
  );
}

export async function deleteStoredContact(
  database: SQLiteDatabase,
  contactId: string,
) {
  await database.runAsync('DELETE FROM contacts WHERE id = ?', contactId);
}

export async function saveStoredContacts(
  database: SQLiteDatabase,
  contacts: StoredContact[],
) {
  await database.withExclusiveTransactionAsync(async (transaction) => {
    for (const contact of contacts) {
      await transaction.runAsync(
        `INSERT INTO contacts (id, name, phone, email)
         VALUES (?, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET
           name = excluded.name,
           phone = excluded.phone,
           email = excluded.email`,
        contact.id,
        contact.name,
        contact.phone,
        contact.email,
      );
    }
  });
}
