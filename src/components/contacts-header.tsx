import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { StoredContact } from '../data/contacts-database';
import { searchContacts } from '../data/search-contacts';
import { useAppTheme } from '../hooks/use-app-theme';
import { useContactsStore } from '../store/contacts-store';
import SearchContactsModal from './search-contacts-modal';

export default function ContactsHeader() {
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const contacts = useContactsStore((state) => state.contacts);
  const searchQuery = useContactsStore((state) => state.searchQuery);
  const isImportingContacts = useContactsStore(
    (state) => state.isImportingContacts,
  );
  const onImportContacts = useContactsStore(
    (state) => state.importContactsHandler,
  );
  const setSearchQuery = useContactsStore((state) => state.setSearchQuery);
  
  const closeSearchModal = () => {
    setSearchQuery('');
    setIsSearchModalVisible(false);
  };
  const selectSearchResult = (contact: StoredContact) => {
    setSearchQuery(contact.name);
    setIsSearchModalVisible(false);
  };
  const hasImportedContacts = contacts.some((contact) =>
    contact.id.startsWith('phone:'),
  );
  const filteredCount = searchContacts(contacts, searchQuery).length;
  const subtitle = searchQuery.trim()
    ? `${filteredCount} of ${contacts.length} contacts`
    : contacts.length === 1
      ? '1 contact'
      : `${contacts.length} contacts`;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: insets.top + 8 },
      ]}
    >
      <View style={styles.titleRow}>
        <View style={styles.titleBlock}>
          <Text style={[styles.title, { color: colors.text }]}>Contacts</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            {subtitle}
          </Text>
        </View>
        <View style={styles.headerActions}>
          {Platform.OS !== 'web' && !hasImportedContacts ? (
            <Pressable
              accessibilityLabel="Import contacts from phone"
              accessibilityRole="button"
              disabled={!onImportContacts || isImportingContacts}
              onPress={onImportContacts}
              style={({ pressed }) => [
                styles.importButton,
                pressed && onImportContacts && !isImportingContacts && styles.importButtonPressed,
                (!onImportContacts || isImportingContacts) && styles.importButtonDisabled,
              ]}
            >
              <Ionicons
                name={isImportingContacts ? 'hourglass-outline' : 'download-outline'}
                size={19}
                color="#FFFFFF"
              />
              <Text style={styles.importButtonText}>
                {isImportingContacts ? 'Importing' : 'Import'}
              </Text>
            </Pressable>
          ) : null}
          <Pressable
            accessibilityLabel="Search contacts"
            accessibilityRole="button"
            onPress={() => setIsSearchModalVisible(true)}
            style={({ pressed }) => [
              styles.iconButton,
              { backgroundColor: colors.surfaceAccent },
              pressed && styles.actionPressed,
            ]}
          >
          <Ionicons name="search-outline" size={21} color={colors.accent} />
          </Pressable>
        </View>
      </View>

      {isSearchModalVisible ? (
        <SearchContactsModal
          onClose={closeSearchModal}
          onSelectContact={selectSearchResult}
          onSearchChange={setSearchQuery}
          searchQuery={searchQuery}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  headerActions: {
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 0,
    gap: 10,
  },
  titleBlock: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 5,
  },
  importButton: {
    alignItems: 'center',
    backgroundColor: '#1D4ED8',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 6,
    minHeight: 42,
    paddingHorizontal: 12,
  },
  importButtonPressed: {
    opacity: 0.75,
  },
  importButtonDisabled: {
    opacity: 0.6,
  },
  importButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  iconButton: {
    alignItems: 'center',
    borderRadius: 12,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  actionPressed: {
    opacity: 0.75,
  },
});
