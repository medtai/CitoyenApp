import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="quiz/session" options={{ presentation: 'fullScreenModal', gestureEnabled: false }} />
        <Stack.Screen name="quiz/result" options={{ presentation: 'card' }} />
      </Stack>
    </>
  );
}
