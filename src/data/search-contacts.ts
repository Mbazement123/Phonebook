import type { StoredContact } from './contacts-database';

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .trim();
}

export function searchContacts(
  contacts: StoredContact[],
  query: string,
): StoredContact[] {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) {
    return contacts;
  }

  const nameTerms = normalizedQuery.split(/[\s'’\-–—]+/).filter(Boolean);
  const phoneDigits = query.replace(/\D/g, '');
  const isPhoneQuery =
    phoneDigits.length > 0 && !/[a-z]/i.test(normalizedQuery);

  return contacts
    .map((contact, index) => {
      const normalizedName = normalizeText(contact.name);
      const nameWords = normalizedName.split(/[\s'’\-–—]+/);
      const normalizedPhone = contact.phone.replace(/\D/g, '');

      let rank: number | null = null;
      if (normalizedName === normalizedQuery) {
        rank = 0;
      } else if (normalizedName.startsWith(normalizedQuery)) {
        rank = 1;
      } else if (
        nameTerms.length > 0 &&
        nameTerms.every((term) =>
          nameWords.some((word) => word.startsWith(term)),
        )
      ) {
        rank = 2;
      } else if (isPhoneQuery && normalizedPhone.startsWith(phoneDigits)) {
        rank = 3;
      }

      return { contact, index, rank };
    })
    .filter(
      (result): result is typeof result & { rank: number } =>
        result.rank !== null,
    )
    .sort((a, b) => a.rank - b.rank || a.index - b.index)
    .map(({ contact }) => contact);
}
