import { Ionicons } from '@expo/vector-icons';
import {
  ContactField,
  ContactsSortOrder,
  Contact as DeviceContact,
  getPermissionsAsync,
  requestPermissionsAsync,
} from 'expo-contacts';
import * as Linking from 'expo-linking';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSQLiteContext } from 'expo-sqlite';
import AddContactModal, { type NewContact } from '../components/add-contact-modal';
import ContactDetailsModal from '../components/contact-details-modal';
import {
  deleteStoredContact,
  getStoredContacts,
  saveStoredContact,
  saveStoredContacts,
  type StoredContact,
} from '../data/contacts-database';
import { searchContacts } from '../data/search-contacts';
import { useAppTheme } from '../hooks/use-app-theme';
import { contactsScreenStyles as styles, getContactAvatarColors } from '../style/main';
import { useContactsStore } from '../store/contacts-store';

type Contact = StoredContact;

export default function ContactsScreen() {
  const { colors, isDark } = useAppTheme();
  const database = useSQLiteContext();
  const contacts = useContactsStore((state) => state.contacts);
  const setContacts = useContactsStore((state) => state.setContacts);
  const upsertContact = useContactsStore((state) => state.upsertContact);
  const deleteContactFromStore = useContactsStore(
    (state) => state.deleteContact,
  );
  const mergeContacts = useContactsStore((state) => state.mergeContacts);
  const searchQuery = useContactsStore((state) => state.searchQuery);
  const setIsImportingContacts = useContactsStore(
    (state) => state.setIsImportingContacts,
  );
  const setImportContactsHandler = useContactsStore(
    (state) => state.setImportContactsHandler,
  );
  const [isLoadingContacts, setIsLoadingContacts] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const selectedContactId = useContactsStore((state) => state.selectedContactId);
  const setSelectedContactId = useContactsStore(
    (state) => state.setSelectedContactId,
  );

  const loadContacts = useCallback(
    () =>
      getStoredContacts(database)
        .then((storedContacts) => {
          setContacts(storedContacts);
        })
        .catch((error: unknown) => {
          setLoadError(
            error instanceof Error
              ? error.message
              : 'Phonebook could not load your contacts.',
          );
        })
        .finally(() => setIsLoadingContacts(false)),
    [database, setContacts],
  );

  useEffect(() => {
    void loadContacts();
  }, [loadContacts]);

  const retryLoadContacts = () => {
    setIsLoadingContacts(true);
    setLoadError(null);
    void loadContacts();
  };
  const filteredContacts = searchContacts(contacts, searchQuery);
  const selectedContact = contacts.find(
    (contact) => contact.id === selectedContactId,
  );

  const saveContact = async (updatedContact: NewContact) => {
    const contact: Contact = {
      ...updatedContact,
      id: editingContact?.id ?? `${Date.now()}-${contacts.length}`,
    };
    try {
      await saveStoredContact(database, contact);
      upsertContact(contact);
      setIsAddModalVisible(false);
      setEditingContact(null);
      setSelectedContactId(null);
    } catch (error) {
      Alert.alert(
        'Unable to save contact',
        error instanceof Error
          ? error.message
          : 'Phonebook could not save this contact. Please try again.',
      );
    }
  };

  const closeModal = () => {
    setIsAddModalVisible(false);
    setEditingContact(null);
    setSelectedContactId(null);
  };

  const deleteContact = async (contact: Contact) => {
    try {
      await deleteStoredContact(database, contact.id);
      deleteContactFromStore(contact.id);
      setSelectedContactId(null);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Phonebook could not delete this contact. Please try again.';
      if (Platform.OS === 'web') {
        globalThis.alert(`Unable to delete contact: ${message}`);
      } else {
        Alert.alert('Unable to delete contact', message);
      }
    }
  };

  const confirmDeleteContact = (contact: Contact) => {
    const message = `Remove ${contact.name} from Phonebook? This will not delete the contact from your device.`;
    if (Platform.OS === 'web') {
      if (globalThis.confirm(`Delete contact?\n\n${message}`)) {
        void deleteContact(contact);
      }
      return;
    }

    Alert.alert(
      'Delete contact?',
      message,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => void deleteContact(contact),
        },
      ],
    );
  };

  const callContact = async (contact: Contact) => {
    const phoneNumber = contact.phone.trim().replace(/[^\d+*#,;]/g, '');
    if (!/\d/.test(phoneNumber)) {
      Alert.alert('Invalid phone number', 'This contact has no callable phone number.');
      return;
    }

    try {
      await Linking.openURL(`tel:${phoneNumber}`);
    } catch {
      Alert.alert(
        'Unable to make call',
        'The phone app could not be opened. Check that this device can place calls and try again.',
      );
    }
  };

  const importPhoneContacts = useCallback(async () => {
    setIsImportingContacts(true);
    try {
      let permission = await getPermissionsAsync();
      if (!permission.granted) {
        permission = await requestPermissionsAsync();
      }
      if (!permission.granted) {
        Alert.alert(
          'Contacts access needed',
          'Allow access to your contacts to import them into Phonebook.',
        );
        return;
      }

      const phoneContacts = await DeviceContact.getAllDetails(
        [ContactField.FULL_NAME, ContactField.PHONES, ContactField.EMAILS],
        { sortOrder: ContactsSortOrder.GivenName },
      );
      const importedContacts = phoneContacts.flatMap((phoneContact) => {
        const phone = phoneContact.phones[0]?.number?.trim();
        if (!phone) {
          return [];
        }
        const name = phoneContact.fullName?.trim() || phone;

        return [{
          id: `phone:${phoneContact.id}`,
          name,
          phone,
          email: phoneContact.emails[0]?.address?.trim() ?? '',
        }];
      });

      if (importedContacts.length === 0) {
        Alert.alert(
          'No phone contacts found',
          'There are no accessible contacts with phone numbers to import.',
        );
        return;
      }

      await saveStoredContacts(database, importedContacts);
      mergeContacts(importedContacts);
      Alert.alert(
        'Contacts imported',
        `${importedContacts.length} phone contacts are now available in Phonebook.`,
      );
    } catch (error) {
      Alert.alert(
        'Unable to import contacts',
        error instanceof Error
          ? error.message
          : 'Phonebook could not read contacts from this device. Please try again.',
      );
    } finally {
      setIsImportingContacts(false);
    }
  }, [
    database,
    mergeContacts,
    setIsImportingContacts,
  ]);

  useEffect(() => {
    setImportContactsHandler(() => void importPhoneContacts());
    return () => setImportContactsHandler(undefined);
  }, [importPhoneContacts, setImportContactsHandler]);

  const renderContact = ({ item: contact }: { item: Contact }) => {
    const avatarColors = getContactAvatarColors(contact.id, isDark) ?? {
      backgroundColor: colors.surfaceAccent,
      textColor: colors.accent,
    };

    return (
      <View
        style={[
          styles.contactCard,
          { borderBottomColor: colors.divider },
          selectedContactId === contact.id && {
            backgroundColor: colors.surfaceAccent,
          },
        ]}
      >
        <Pressable
          accessibilityLabel={`Show details for ${contact.name}`}
          accessibilityRole="button"
          accessibilityState={{ selected: selectedContactId === contact.id }}
          onPress={() =>
            setSelectedContactId(
              selectedContactId === contact.id ? null : contact.id,
            )
          }
          style={({ pressed }) => [
            styles.contactInfo,
            pressed && styles.contactCardPressed,
          ]}
        >
          <View
            style={[
              styles.avatar,
              { backgroundColor: avatarColors.backgroundColor },
            ]}
          >
            <Text style={[styles.avatarText, { color: avatarColors.textColor }]}>
              {contact.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.contactDetails}>
            <Text style={[styles.contactName, { color: colors.text }]}>
              {contact.name}
            </Text>
            <Text
              style={[
                styles.contactPhone,
                { color: colors.textSecondary },
              ]}
            >
              {contact.phone}
            </Text>
            {contact.email ? (
              <Text
                style={[
                  styles.contactEmail,
                  { color: colors.textMuted },
                ]}
              >
                {contact.email}
              </Text>
            ) : null}
          </View>
        </Pressable>
        <Pressable
          accessibilityLabel={`Call ${contact.name}`}
          accessibilityRole="button"
          onPress={() => void callContact(contact)}
          style={({ pressed }) => [
            styles.callButton,
            {
              backgroundColor: pressed
                ? colors.surfaceAccentPressed
                : colors.surfaceAccent,
            },
          ]}
        >
          <Ionicons name="call" size={19} color={colors.accent} />
        </Pressable>
      </View>
    );
  };
  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom']}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {isLoadingContacts ? (
        <View style={styles.emptyState}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={[styles.emptyMessage, { color: colors.textMuted }]}>
            Loading contacts…
          </Text>
        </View>
      ) : loadError ? (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            Unable to load contacts
          </Text>
          <Text style={[styles.emptyMessage, { color: colors.textMuted }]}>
            {loadError}
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={retryLoadContacts}
            style={[styles.retryButton, { backgroundColor: colors.action }]}
          >
            <Text style={styles.retryButtonText}>Try again</Text>
          </Pressable>
        </View>
      ) : contacts.length === 0 ? (
        <View style={styles.emptyState}>
          <View
            style={[
              styles.emptyIcon,
              { backgroundColor: colors.surfaceAccent },
            ]}
          >
            <Ionicons name="people-outline" size={30} color={colors.accentBright} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            No contacts yet
          </Text>
          <Text style={[styles.emptyMessage, { color: colors.textMuted }]}>
            Tap the plus button to add your first contact.
          </Text>
        </View>
      ) : filteredContacts.length === 0 ? (
        <View style={styles.emptyState}>
          <View
            style={[
              styles.emptyIcon,
              { backgroundColor: colors.surfaceAccent },
            ]}
          >
            <Ionicons name="search-outline" size={30} color={colors.accentBright} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            No matching contacts
          </Text>
          <Text style={[styles.emptyMessage, { color: colors.textMuted }]}>
            Try a different name or phone number.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredContacts}
          keyExtractor={(contact) => contact.id}
          renderItem={renderContact}
          contentContainerStyle={styles.contactList}
          keyboardShouldPersistTaps="handled"
        />
      )}

      {!isLoadingContacts && !loadError ? (
        <Pressable
          accessibilityLabel="Add contact"
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.fab,
            { backgroundColor: colors.surfaceSubtle },
            pressed && styles.fabOnPress,
          ]}
          onPress={() => setIsAddModalVisible(true)}
        >
          <Ionicons name="add" size={28} color={colors.accentBright} />
        </Pressable>
      ) : null}

      {isAddModalVisible ? (
        <AddContactModal
          key={editingContact?.id ?? 'new-contact'}
          initialContact={editingContact ?? undefined}
          onAddContact={saveContact}
          onClose={closeModal}
        />
      ) : null}
      {selectedContact ? (
        <ContactDetailsModal
          contactId={selectedContact.id}
          name={selectedContact.name}
          phone={selectedContact.phone}
          onClose={() => setSelectedContactId(null)}
          onCall={() => {
            setSelectedContactId(null);
            void callContact(selectedContact);
          }}
          onEdit={() => {
            setSelectedContactId(null);
            setEditingContact(selectedContact);
            setIsAddModalVisible(true);
          }}
          onDelete={() => confirmDeleteContact(selectedContact)}
        />
      ) : null}
    </SafeAreaView>
  );
}
