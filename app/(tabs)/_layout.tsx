import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type IconName = keyof typeof Ionicons.glyphMap;

function TabIcon({ icon, iconFocused, label, focused }: { icon: IconName; iconFocused: IconName; label: string; focused: boolean }) {
  return (
    <View style={{ alignItems: 'center', paddingTop: 4 }}>
      <Ionicons
        name={focused ? iconFocused : icon}
        size={22}
        color={focused ? '#6366F1' : '#9CA3AF'}
      />
      <Text
        style={{
          fontSize: 10,
          marginTop: 2,
          color: focused ? '#6366F1' : '#9CA3AF',
          fontWeight: focused ? '700' : '400',
        }}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 72,
          paddingBottom: 8,
          paddingTop: 4,
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          elevation: 8,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="home-outline" iconFocused="home" label="Accueil" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="help-circle-outline" iconFocused="help-circle" label="Quiz" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="book-outline" iconFocused="book" label="Apprendre" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="bar-chart-outline" iconFocused="bar-chart" label="Historique" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="person-outline" iconFocused="person" label="Profil" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
