import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Input from "../components/Input";
import Button from "../components/Button";
import { authenticate } from "../services/authService";
import { saveSession } from "../services/storageService";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>;

export default function LoginScreen({
  navigation,
}: Props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [emailError, setEmailError] =
    useState("");

  const [senhaError, setSenhaError] =
    useState("");

  const [loginError, setLoginError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin() {
    setEmailError("");
    setSenhaError("");
    setLoginError("");

    let valid = true;

    if (!email.trim()) {
      setEmailError("Informe o e-mail.");
      valid = false;
    }

    if (!senha.trim()) {
      setSenhaError("Informe a senha.");
      valid = false;
    }

    if (!valid) {
      return;
    }

    setLoading(true);

    try {
      const session = authenticate(
        email,
        senha
      );

      if (!session) {
        setLoginError(
          "E-mail ou senha incorretos."
        );

        return;
      }

      await saveSession(session);

      navigation.replace("Occurrences");
    } catch (error) {
      console.error(
        "Erro no login:",
        error
      );

      setLoginError(
        "Não foi possível realizar o login. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logo}>
          <Text style={styles.logoText}>
            NS
          </Text>
        </View>

        <Text style={styles.title}>
          Nuclear Sentinel
        </Text>

        <Text style={styles.subtitle}>
          Monitoramento inteligente de
          ambientes críticos
        </Text>

        <View style={styles.form}>
          <Input
            label="E-mail"
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            error={emailError}
          />

          <Input
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            error={senhaError}
          />

          {loginError ? (
            <View style={styles.errorBox}>
              <Text
                style={styles.errorTitle}
              >
                Login inválido
              </Text>

              <Text
                style={styles.errorText}
              >
                {loginError}
              </Text>
            </View>
          ) : null}

          <Button
            title="Entrar"
            onPress={handleLogin}
            loading={loading}
          />

          <View style={styles.testBox}>
            <Text style={styles.testTitle}>
              Contas de teste
            </Text>

            <Text style={styles.testText}>
              Operador:
              {" "}
              operador@nuclearsentinel.com
            </Text>

            <Text style={styles.testText}>
              Supervisor:
              {" "}
              supervisor@nuclearsentinel.com
            </Text>

            <Text style={styles.testText}>
              Senha: 123456
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071A2B",
  },

  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  logo: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: "#2F80B7",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 18,
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
  },

  title: {
    color: "#E6EEF2",
    fontSize: 29,
    fontWeight: "800",
    textAlign: "center",
  },

  subtitle: {
    color: "#9FB4C0",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 30,
    lineHeight: 20,
  },

  form: {
    backgroundColor: "#0D2A40",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#2A5068",
  },

  errorBox: {
    backgroundColor: "#3A1D24",
    borderWidth: 1,
    borderColor: "#D64545",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },

  errorTitle: {
    color: "#F2B8B8",
    fontWeight: "800",
    fontSize: 14,
  },

  errorText: {
    color: "#E6EEF2",
    marginTop: 3,
    fontSize: 13,
  },

  testBox: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#2A5068",
  },

  testTitle: {
    color: "#E6EEF2",
    fontWeight: "700",
    marginBottom: 5,
  },

  testText: {
    color: "#9FB4C0",
    fontSize: 12,
    marginTop: 3,
  },
});