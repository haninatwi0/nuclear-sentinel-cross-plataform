import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import OccurrencesScreen from "../screens/OccurrencesScreen";
import NewOccurrenceScreen from "../screens/NewOccurrenceScreen";
import OccurrenceDetailsScreen from "../screens/OccurrenceDetailsScreen";
import { colors } from "../theme";

export type RootStackParamList = {
  Login: undefined;
  Occurrences: undefined;
  NewOccurrence: undefined;
  OccurrenceDetails: { occurrenceId: string };
};

type Props = { hasSession: boolean };
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator({ hasSession }: Props) {
  return (
    <Stack.Navigator
      initialRouteName={hasSession ? "Occurrences" : "Login"}
      screenOptions={{
        headerStyle: { backgroundColor: colors.backgroundAlt },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: "700", fontSize: 14 },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Occurrences" component={OccurrencesScreen} options={{ title: "Monitoramento" }} />
      <Stack.Screen name="NewOccurrence" component={NewOccurrenceScreen} options={{ title: "Novo registro" }} />
      <Stack.Screen name="OccurrenceDetails" component={OccurrenceDetailsScreen} options={{ title: "Detalhes do registro" }} />
    </Stack.Navigator>
  );
}
