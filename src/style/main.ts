import { StyleSheet } from 'react-native';

export const white = '#FFFFFF';

export const lightColors = {
  background: white,
  surface: white,
  surfaceRaised: '#F7F9FC',
  surfaceSubtle: '#F1F4F8',
  surfaceAccent: '#EAF3FF',
  surfaceAccentPressed: '#D6E7FF',
  text: '#172B3D',
  textSecondary: '#4B6075',
  textMuted: '#6B7C8F',
  placeholder: '#91A0AF',
  border: '#DFE6EF',
  divider: '#E8EEF5',
  accent: '#1D6FD6',
  accentBright: '#2F80ED',
  action: '#1D4ED8',
  actionPressed: '#1E40AF',
  error: '#B42318',
  dangerSurface: '#FEF3F2',
  danger: '#B42318',
} as const;

export const darkColors = {
  background: '#0B1220',
  surface: '#111A2B',
  surfaceRaised: '#1E293B',
  surfaceSubtle: '#26354A',
  surfaceAccent: '#142B45',
  surfaceAccentPressed: '#1C3D63',
  text: '#E6EDF7',
  textSecondary: '#BAC8D9',
  textMuted: '#98A8BC',
  placeholder: '#8798AE',
  border: '#36465D',
  divider: '#253449',
  accent: '#7CB8FF',
  accentBright: '#60A5FA',
  action: '#1D4ED8',
  actionPressed: '#1E40AF',
  error: '#FDA29B',
  dangerSurface: '#3B2024',
  danger: '#FDA29B',
} as const;

export const contactsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 36,
    paddingBottom: 80,
  },
  emptyIcon: {
    alignItems: 'center',
    borderRadius: 32,
    height: 64,
    justifyContent: 'center',
    width: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 18,
  },
  emptyMessage: {
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    textAlign: 'center',
  },
  retryButton: {
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  retryButtonText: {
    color: white,
    fontSize: 14,
    fontWeight: '600',
  },
  contactList: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  contactCard: {
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    paddingVertical: 14,
  },
  contactInfo: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  contactCardPressed: {
    opacity: 0.7,
  },
  callButton: {
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    marginLeft: 10,
    width: 40,
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
    fontSize: 18,
    fontWeight: '600',
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
  },
  contactPhone: {
    fontSize: 14,
    marginTop: 4,
  },
  contactEmail: {
    fontSize: 13,
    marginTop: 2,
  },
  fab: {
    alignItems: 'center',
    borderRadius: 35,
    bottom: 32,
    elevation: 6,
    height: 70,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
    width: 70,
  },
  fabOnPress: {
    height: 56,
    width: 56,
    borderRadius: 28,
  },
});

export const contactsHeaderStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
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
    backgroundColor: lightColors.action,
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
    color: white,
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

export const addContactModalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalSafeArea: {
    flex: 1,
  },
  modalCard: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 12,
  },
  modalHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  modalSubtitle: {
    fontSize: 14,
    marginTop: 5,
  },
  closeButton: {
    alignItems: 'center',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
    height: 52,
    marginBottom: 18,
    paddingHorizontal: 15,
  },
  formError: {
    fontSize: 13,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  cancelButton: {
    alignItems: 'center',
    borderRadius: 13,
    flex: 1,
    justifyContent: 'center',
    minHeight: 52,
  },
  secondaryButtonPressed: {
    opacity: 0.75,
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  saveButton: {
    alignItems: 'center',
    borderRadius: 13,
    flex: 1.4,
    justifyContent: 'center',
    minHeight: 52,
  },
  saveButtonText: {
    color: white,
    fontSize: 15,
    fontWeight: '700',
  },
});

export const searchContactsModalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalSafeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  modalHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  closeButton: {
    alignItems: 'center',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  searchBox: {
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    minHeight: 50,
    paddingHorizontal: 14,
  },
  searchHint: {
    fontSize: 13,
    marginTop: 12,
  },
  resultsLabel: {
    fontSize: 13,
    fontWeight: '600',
    paddingTop: 22,
    paddingBottom: 8,
  },
  resultsList: {
    flex: 1,
    marginTop: 4,
  },
  resultRow: {
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    minHeight: 72,
    paddingVertical: 10,
  },
  avatar: {
    alignItems: 'center',
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    marginRight: 12,
    width: 44,
  },
  avatarText: {
    fontSize: 17,
    fontWeight: '600',
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 15,
    fontWeight: '600',
  },
  contactPhone: {
    fontSize: 14,
    marginTop: 3,
  },
  noResults: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 80,
  },
  noResultsTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 10,
  },
});

export const contactDetailsModalStyles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.48)',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  overlayPressable: StyleSheet.absoluteFill,
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

function hashContactId(contactId: string) {
  let hash = 2166136261;
  for (let index = 0; index < contactId.length; index += 1) {
    hash ^= contactId.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function hslToHex(hue: number, saturation: number, lightness: number) {
  const normalizedSaturation = saturation / 100;
  const normalizedLightness = lightness / 100;
  const chroma =
    (1 - Math.abs(2 * normalizedLightness - 1)) * normalizedSaturation;
  const hueSection = hue / 60;
  const intermediate = chroma * (1 - Math.abs((hueSection % 2) - 1));
  const offset = normalizedLightness - chroma / 2;
  const [red, green, blue] =
    hueSection < 1
      ? [chroma, intermediate, 0]
      : hueSection < 2
        ? [intermediate, chroma, 0]
        : hueSection < 3
          ? [0, chroma, intermediate]
          : hueSection < 4
            ? [0, intermediate, chroma]
            : hueSection < 5
              ? [intermediate, 0, chroma]
              : [chroma, 0, intermediate];
  const toHex = (value: number) =>
    Math.round((value + offset) * 255)
      .toString(16)
      .padStart(2, '0');

  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

export function getContactAvatarColors(contactId: string, isDark: boolean) {
  if (!contactId) {
    return null;
  }

  const hash = hashContactId(contactId);
  const hue = hash % 360;
  const saturation = 66 + ((hash >>> 9) % 20);
  const lightnessVariation = (hash >>> 16) % 9;

  return {
    backgroundColor: hslToHex(
      hue,
      isDark ? 50 + ((hash >>> 9) % 20) : saturation,
      isDark ? 20 + lightnessVariation : 87 + lightnessVariation,
    ),
    textColor: hslToHex(
      hue,
      65 + ((hash >>> 5) % 25),
      isDark
        ? 76 + ((hash >>> 19) % 13)
        : 26 + ((hash >>> 23) % 13),
    ),
  };
}
