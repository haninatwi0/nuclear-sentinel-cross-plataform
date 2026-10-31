import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./src/navigation/AppNavigator";
import { getSession, initializeStorage } from "./src/services/storageService";
import { colors } from "./src/theme";

export default function App() {
  const [ready, setReady] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await initializeStorage();
        const session = await getSession();
        setHasSession(session !== null);
      } catch (error) {
        console.error("Erro ao inicializar aplicação:", error);
      } finally {
        setReady(true);
      }
    }
    prepare();
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={colors.primaryLight} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator hasSession={hasSession} />
    </NavigationContainer>
  );
}