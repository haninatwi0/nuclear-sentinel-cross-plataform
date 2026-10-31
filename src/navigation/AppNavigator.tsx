import React from "react";
import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import OccurrencesScreen from "../screens/OccurrencesScreen";
import NewOccurrenceScreen from "../screens/NewOccurrenceScreen";
import OccurrenceDetailsScreen from "../screens/OccurrenceDetailsScreen";

export type RootStackParamList = {
  Login: undefined;
  Occurrences: undefined;
  NewOccurrence: undefined;
  OccurrenceDetails: {
    occurrenceId: string;
  };
};

type Props = {
  hasSession: boolean;
};

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator({
  hasSession,
}: Props) {
  return (
    <Stack.Navigator
      initialRouteName={
        hasSession
          ? "Occurrences"
          : "Login"
      }
      screenOptions={{
        headerStyle: {
          backgroundColor: "#071A2B",
        },

        headerTintColor: "#E6EEF2",

        headerTitleStyle: {
          fontWeight: "700",
        },

        contentStyle: {
          backgroundColor: "#071A2B",
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Occurrences"
        component={OccurrencesScreen}
        options={{
          title: "Ocorrências",
        }}
      />

      <Stack.Screen
        name="NewOccurrence"
        component={NewOccurrenceScreen}
        options={{
          title: "Nova ocorrência",
        }}
      />

      <Stack.Screen
        name="OccurrenceDetails"
        component={OccurrenceDetailsScreen}
        options={{
          title: "Detalhes",
        }}
      />
    </Stack.Navigator>
  );
}