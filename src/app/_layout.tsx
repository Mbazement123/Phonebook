import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'react-native';
import ContactsHeader from '../components/contacts-header';
import { initializeContactsDatabase } from '../data/contacts-database';
import { useAppTheme } from '../hooks/use-app-theme';

export default function RootLayout() {
  const { colors, isDark } = useAppTheme();

  return (
    <SQLiteProvider
      databaseName="phonebook.db"
      onInit={initializeContactsDatabase}
    >
      <StatusBar
        backgroundColor={colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Header asChild>
            <ContactsHeader />
          </Stack.Header>
        </Stack.Screen>
      </Stack>
    </SQLiteProvider>
  );
}
