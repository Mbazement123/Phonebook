import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal as NativeModal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../hooks/use-app-theme';
import { addContactModalStyles as styles } from '../style/main';

export type NewContact = {
  name: string;
  phone: string;
  email: string;
};

type AddContactModalProps = {
  initialContact?: NewContact;
  onClose: () => void;
  onAddContact: (contact: NewContact) => void;
};

export default function AddContactModal({
  initialContact,
  onClose,
  onAddContact,
}: AddContactModalProps) {
  const { colors } = useAppTheme();
  const [name, setName] = useState(initialContact?.name ?? '');
  const [phone, setPhone] = useState(initialContact?.phone ?? '');
  const [email, setEmail] = useState(initialContact?.email ?? '');
  const [formError, setFormError] = useState('');
  const isEditing = initialContact !== undefined;

  const closeModal = () => {
    setFormError('');
    onClose();
  };

  const addContact = () => {
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || !trimmedPhone) {
      setFormError('Enter a name and phone number to add this contact.');
      return;
    }

    onAddContact({
      name: trimmedName,
      phone: trimmedPhone,
      email: email.trim(),
    });
    setName('');
    setPhone('');
    setEmail('');
    setFormError('');
  };

  return (
    <NativeModal
      animationType="slide"
      onRequestClose={closeModal}
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
          <View style={[styles.modalCard, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  {isEditing ? 'Edit contact' : 'Add contact'}
                </Text>
                <Text style={[styles.modalSubtitle, { color: colors.textMuted }]}>
                  {isEditing
                    ? 'Update this contact’s details'
                    : 'Add someone to your phonebook'}
                </Text>
              </View>
              <Pressable
                accessibilityLabel="Close add contact form"
                accessibilityRole="button"
                onPress={closeModal}
                style={[styles.closeButton, { backgroundColor: colors.surfaceSubtle }]}
              >
                <Ionicons name="close" size={22} color={colors.textSecondary} />
              </Pressable>
            </View>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
                Name *
              </Text>
              <TextInput
                autoCapitalize="words"
                autoComplete="name"
                onChangeText={setName}
                placeholder="e.g. Alex Morgan"
                placeholderTextColor={colors.placeholder}
                returnKeyType="next"
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.surfaceRaised,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                value={name}
              />

              <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
                Phone number *
              </Text>
              <TextInput
                autoComplete="tel"
                keyboardType="phone-pad"
                onChangeText={setPhone}
                placeholder="e.g. +1 555 0100"
                placeholderTextColor={colors.placeholder}
                returnKeyType="next"
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.surfaceRaised,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                value={phone}
              />

              <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
                Email (optional)
              </Text>
              <TextInput
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholder="e.g. alex@example.com"
                placeholderTextColor={colors.placeholder}
                returnKeyType="done"
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.surfaceRaised,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                value={email}
              />

              {formError ? (
                <Text
                  accessibilityRole="alert"
                  style={[styles.formError, { color: colors.error }]}
                >
                  {formError}
                </Text>
              ) : null}

              <View style={styles.modalActions}>
                <Pressable
                  onPress={closeModal}
                  style={({ pressed }) => [
                    styles.cancelButton,
                    { backgroundColor: colors.surfaceSubtle },
                    pressed && styles.secondaryButtonPressed,
                  ]}
                >
                  <Text style={[styles.cancelButtonText, { color: colors.textSecondary }]}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={addContact}
                  style={({ pressed }) => [
                    styles.saveButton,
                    {
                      backgroundColor: pressed
                        ? colors.actionPressed
                        : colors.action,
                    },
                  ]}
                >
                  <Text style={styles.saveButtonText}>
                    {isEditing ? 'Save changes' : 'Add contact'}
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </NativeModal>
  );
}
