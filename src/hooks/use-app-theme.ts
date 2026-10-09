import { useColorScheme } from 'react-native';
import { darkColors, lightColors } from '../style/main';

export function useAppTheme() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return {
    colors: isDark ? darkColors : lightColors,
    isDark,
  };
}
