import { create } from "zustand";

export type Contact = {
  id: string;
  name: string;
  phone: string;
};

type ContactStore = {
  contacts: Contact[];

  addContact: (contact: Contact) => void;
  removeContact: (id: string) => void;
};

export const useContactStore = create<ContactStore>((set) => ({
  contacts: [],

  addContact: (contact) =>
    set((state) => ({
      contacts: [...state.contacts, contact],
    })),

  removeContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    })),
}));
