import { useColorScheme } from 'react-native';

const lightColors = {
  background: '#FFFFFF',
  surface: '#FFFFFF',
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

const darkColors = {
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

export function useAppTheme() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return {
    colors: isDark ? darkColors : lightColors,
    isDark,
  };
}
