import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@hooks/useThemeColors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddEditScreen from '@screens/app/AddEditScreen';
import ApprovalsScreen from '@screens/app/ApprovalsScreen';
import CalendarScreen from '@screens/app/CalendarScreen';
import FamilyMembersScreen from '@screens/app/FamilyMembersScreen';
import HomeScreen from '@screens/app/HomeScreen';
import ManageCategoriesScreen from '@screens/app/ManageCategoriesScreen';
import SettingsScreen from '@screens/app/SettingsScreen';
import { familyService } from '@src/firebase';
import { useCategoryStore } from '@store/categoryStore';
import { useTaskStore } from '@store/taskStore';
import { useUserStore } from '@store/userStore';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Helper function to get standardized header options
const getHeaderOptions = (colors: any, title: string, options?: any) => ({
  title,
  headerTitleAlign: 'center' as const,
  headerStyle: {
    backgroundColor: colors.background,
    elevation: 0, // Remove shadow on Android
    shadowOpacity: 0, // Remove shadow on iOS
    borderBottomWidth: 0, // Remove border line
  },
  headerTitleStyle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600' as const,
  },
  ...options,
});

function SettingsStack() {
  const colors = useThemeColors();
  const { t } = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          color: colors.text,
        },
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="SettingsMain" component={SettingsScreen} options={getHeaderOptions(colors, t('settings.title'))} />
      <Stack.Screen
        name="FamilyMembers"
        component={FamilyMembersScreen}
        options={getHeaderOptions(colors, t('settings.manage_members'))}
      />
      <Stack.Screen
        name="Approvals"
        component={ApprovalsScreen}
        options={getHeaderOptions(colors, t('settings.approvals'))}
      />
      <Stack.Screen
        name="ManageCategories"
        component={ManageCategoriesScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function NotificationBadge() {
  const colors = useThemeColors();
  const navigation = useNavigation();
  const user = useUserStore((state) => state.user);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (!user?.familyId || user.role !== 'admin') {
      setPendingCount(0);
      return;
    }

    const unsubscribe = familyService.subscribeToApprovals(user.familyId, (approvals) => {
      setPendingCount(approvals.length);
    });

    return () => unsubscribe();
  }, [user?.familyId, user?.role]);

  // Always show icon for admins, only hide badge when count is 0
  if (user?.role !== 'admin') return null;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Approvals' as never)}
      style={{ position: 'relative', marginRight: 16 }}
    >
      <Ionicons name="notifications-outline" size={24} color={colors.warning} />
      {pendingCount > 0 && (
        <View style={[styles.notificationDot, { backgroundColor: colors.danger }]} />
      )}
    </TouchableOpacity>
  );
}

function HomeStack() {
  const colors = useThemeColors();
  const { t } = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          color: colors.text,
        },
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={getHeaderOptions(colors, t('tasks.title'), {
          headerRight: () => <NotificationBadge />,
        })}
      />
      <Stack.Screen
        name="AddEdit"
        component={AddEditScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Approvals"
        component={ApprovalsScreen}
        options={{ title: t('settings.approvals') }}
      />
    </Stack.Navigator>
  );
}

function CalendarStack() {
  const colors = useThemeColors();
  const { t } = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          color: colors.text,
        },
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="CalendarMain"
        component={CalendarScreen}
        options={getHeaderOptions(colors, t('calendar.title'))}
      />
      <Stack.Screen
        name="AddEdit"
        component={AddEditScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function AppStack() {
  const colors = useThemeColors();
  const { t } = useTranslation();
  const user = useUserStore((state) => state.user);
  const { initialize: initializeCategories, cleanup: cleanupCategories } = useCategoryStore();
  const { initialize: initializeTasks } = useTaskStore();

  // Initialize stores when user logs in
  useEffect(() => {
    if (user?.familyId) {
      // Initialize category store
      initializeCategories(user.familyId);

      // Initialize task store
      const unsubscribeTasks = initializeTasks();

      return () => {
        cleanupCategories();
        if (unsubscribeTasks) {
          unsubscribeTasks();
        }
      };
    }
  }, [user?.familyId]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'home';
          if (route.name === 'Home') iconName = focused ? 'list' : 'list-outline';
          else if (route.name === 'Calendar') iconName = focused ? 'calendar' : 'calendar-outline';
          else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ title: t('tasks.title') }} />
      <Tab.Screen name="Calendar" component={CalendarStack} options={{ title: t('calendar.title') }} />
      <Tab.Screen name="Settings" component={SettingsStack} options={{ title: t('settings.title') }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
