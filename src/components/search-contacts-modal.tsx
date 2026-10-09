import { Ionicons } from '@expo/vector-icons';
import {
  FlatList,
  KeyboardAvoidingView,
  Modal as NativeModal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { StoredContact } from '../data/contacts-database';
import { searchContacts } from '../data/search-contacts';
import { useAppTheme } from '../hooks/use-app-theme';
import { useContactsStore } from '../store/contacts-store';
import {
  getContactAvatarColors,
  searchContactsModalStyles as styles,
} from '../style/main';

type SearchContactsModalProps = {
  onClose: () => void;
  onSelectContact: (contact: StoredContact) => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
};

export default function SearchContactsModal({
  onClose,
  onSelectContact,
  onSearchChange,
  searchQuery,
}: SearchContactsModalProps) {
  const { colors, isDark } = useAppTheme();
  const contacts = useContactsStore((state) => state.contacts);
  const results = searchContacts(contacts, searchQuery);

  return (
    <NativeModal
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
      visible
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[styles.modalContainer, { backgroundColor: colors.background }]}
      >
        <SafeAreaView
          style={[styles.modalSafeArea, { backgroundColor: colors.background }]}
        >
          <View style={[styles.content, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Search contacts
              </Text>
              <Pressable
                accessibilityLabel="Close contact search"
                accessibilityRole="button"
                onPress={onClose}
                style={[styles.closeButton, { backgroundColor: colors.surfaceSubtle }]}
              >
                <Ionicons name="close" size={22} color={colors.textSecondary} />
              </Pressable>
            </View>
            <View
              style={[
                styles.searchBox,
                {
                  backgroundColor: colors.surfaceRaised,
                  borderColor: colors.border,
                },
              ]}
            >
              <Ionicons name="search-outline" size={20} color={colors.textMuted} />
              <TextInput
                accessibilityLabel="Search contacts by name or phone number"
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus
                onChangeText={onSearchChange}
                placeholder="Search by name or phone"
                placeholderTextColor={colors.placeholder}
                returnKeyType="search"
                style={[styles.searchInput, { color: colors.text }]}
                value={searchQuery}
              />
              {searchQuery.length > 0 ? (
                <Pressable
                  accessibilityLabel="Clear contact search"
                  accessibilityRole="button"
                  hitSlop={8}
                  onPress={() => onSearchChange('')}
                >
                  <Ionicons name="close-circle" size={20} color={colors.placeholder} />
                </Pressable>
              ) : null}
            </View>
            {searchQuery.trim() ? (
              results.length > 0 ? (
                <FlatList
                  data={results}
                  keyboardShouldPersistTaps="handled"
                  keyExtractor={(contact) => contact.id}
                  ListHeaderComponent={
                    <Text style={[styles.resultsLabel, { color: colors.textMuted }]}>
                      {results.length === 1
                        ? '1 contact found'
                        : `${results.length} contacts found`}
                    </Text>
                  }
                  renderItem={({ item: contact }) => {
                    const avatarColors =
                      getContactAvatarColors(contact.id, isDark) ?? {
                        backgroundColor: colors.surfaceAccent,
                        textColor: colors.accent,
                      };

                    return (
                      <Pressable
                        accessibilityLabel={`${contact.name}, ${contact.phone}`}
                        accessibilityRole="button"
                        onPress={() => onSelectContact(contact)}
                        style={({ pressed }) => [
                          styles.resultRow,
                          { borderBottomColor: colors.divider },
                          pressed && {
                            backgroundColor: colors.surfaceRaised,
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.avatar,
                            { backgroundColor: avatarColors.backgroundColor },
                          ]}
                        >
                          <Text
                            style={[
                              styles.avatarText,
                              { color: avatarColors.textColor },
                            ]}
                          >
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
                        </View>
                        <Ionicons
                          name="chevron-forward"
                          size={18}
                          color={colors.placeholder}
                        />
                      </Pressable>
                    );
                  }}
                  style={styles.resultsList}
                />
              ) : (
                <View style={styles.noResults}>
                  <Ionicons
                    name="search-outline"
                    size={26}
                    color={colors.placeholder}
                  />
                  <Text style={[styles.noResultsTitle, { color: colors.text }]}>
                    No matching contacts
                  </Text>
                  <Text style={[styles.searchHint, { color: colors.textMuted }]}>
                    Try another name or phone number.
                  </Text>
                </View>
              )
            ) : (
              <Text style={[styles.searchHint, { color: colors.textMuted }]}>
                Search by contact name or phone number.
              </Text>
            )}
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </NativeModal>
  );
}
