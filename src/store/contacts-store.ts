import { create } from 'zustand';
import type { StoredContact } from '../data/contacts-database';

type ContactsStore = {
  contacts: StoredContact[];
  searchQuery: string;
  selectedContactId: string | null;
  isImportingContacts: boolean;
  importContactsHandler?: () => void;
  setContacts: (contacts: StoredContact[]) => void;
  upsertContact: (contact: StoredContact) => void;
  deleteContact: (contactId: string) => void;
  mergeContacts: (contacts: StoredContact[]) => void;
  setSearchQuery: (query: string) => void;
  setSelectedContactId: (contactId: string | null) => void;
  setIsImportingContacts: (isImporting: boolean) => void;
  setImportContactsHandler: (handler?: () => void) => void;
};

export const useContactsStore = create<ContactsStore>((set) => ({
  contacts: [],
  searchQuery: '',
  selectedContactId: null,
  isImportingContacts: false,
  setContacts: (contacts) => set({ contacts }),
  upsertContact: (contact) =>
    set((state) => {
      const existingIndex = state.contacts.findIndex(
        (existingContact) => existingContact.id === contact.id,
      );
      if (existingIndex === -1) {
        return { contacts: [...state.contacts, contact] };
      }
      return {
        contacts: state.contacts.map((existingContact) =>
          existingContact.id === contact.id ? contact : existingContact,
        ),
      };
    }),
  deleteContact: (contactId) =>
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== contactId),
    })),
  mergeContacts: (contacts) =>
    set((state) => {
      const incomingIds = new Set(contacts.map((contact) => contact.id));
      return {
        contacts: [
          ...state.contacts.filter((contact) => !incomingIds.has(contact.id)),
          ...contacts,
        ],
      };
    }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedContactId: (selectedContactId) => set({ selectedContactId }),
  setIsImportingContacts: (isImportingContacts) =>
    set({ isImportingContacts }),
  setImportContactsHandler: (importContactsHandler) =>
    set({ importContactsHandler }),
}));
