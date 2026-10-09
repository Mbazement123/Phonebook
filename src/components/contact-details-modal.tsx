import { Ionicons } from '@expo/vector-icons';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useAppTheme } from '../hooks/use-app-theme';
import { getContactAvatarColors } from '../utils/contact-avatar';

type ContactDetailsModalProps = {
  contactId: string;
  name: string;
  phone: string;
  onClose: () => void;
  onCall: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

export default function ContactDetailsModal({
  contactId,
  name,
  phone,
  onClose,
  onCall,
  onDelete,
  onEdit,
}: ContactDetailsModalProps) {
  const { colors, isDark } = useAppTheme();
  const avatarColors = getContactAvatarColors(contactId, isDark) ?? {
    backgroundColor: colors.surfaceAccent,
    textColor: colors.accent,
  };

  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
      transparent
      visible
    >
      <View style={styles.overlay}>
        <Pressable
          accessibilityLabel="Close contact details"
          onPress={onClose}
          style={StyleSheet.absoluteFill}
        />
        <View
          accessibilityViewIsModal
          style={[
            styles.card,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.heading}>
            <View
              style={[
                styles.avatar,
                { backgroundColor: avatarColors.backgroundColor },
              ]}
            >
              <Text style={[styles.avatarText, { color: avatarColors.textColor }]}>
                {name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={[styles.name, { color: colors.text }]}>{name}</Text>
              <Text style={[styles.phone, { color: colors.textSecondary }]}>
                {phone}
              </Text>
            </View>
            <Pressable
              accessibilityLabel="Close contact details"
              accessibilityRole="button"
              hitSlop={8}
              onPress={onClose}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={20} color={colors.textMuted} />
            </Pressable>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.divider }]} />

          <View style={styles.actions}>
            <ActionButton
              icon="call-outline"
              label="Call"
              color={colors.accent}
              backgroundColor={colors.surfaceAccent}
              onPress={onCall}
            />
            <ActionButton
              icon="create-outline"
              label="Edit"
              color={colors.accent}
              backgroundColor={colors.surfaceAccent}
              onPress={onEdit}
            />
            <ActionButton
              icon="trash-outline"
              label="Delete"
              color={colors.danger}
              backgroundColor={colors.dangerSurface}
              onPress={onDelete}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

type ActionButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
  backgroundColor: string;
  onPress: () => void;
};

function ActionButton({
  icon,
  label,
  color,
  backgroundColor,
  onPress,
}: ActionButtonProps) {
  return (
    <Pressable
      accessibilityLabel={`${label} contact`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionButton,
        { backgroundColor },
        pressed && styles.actionPressed,
      ]}
    >
      <Ionicons name={icon} size={21} color={color} />
      <Text style={[styles.actionLabel, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.48)',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    maxWidth: 420,
    padding: 20,
    width: '100%',
  },
  heading: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: {
    alignItems: 'center',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    marginRight: 14,
    width: 50,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
  },
  contactInfo: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  phone: {
    fontSize: 14,
    marginTop: 4,
  },
  closeButton: {
    alignItems: 'center',
    height: 32,
    justifyContent: 'center',
    marginLeft: 8,
    width: 32,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 18,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    alignItems: 'center',
    borderRadius: 14,
    flex: 1,
    gap: 7,
    justifyContent: 'center',
    minHeight: 68,
    paddingVertical: 10,
  },
  actionPressed: {
    opacity: 0.7,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});
