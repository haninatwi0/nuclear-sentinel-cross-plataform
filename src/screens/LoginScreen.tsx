import React, { useState } from "react";
import {
  KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Input from "../components/Input";
import Button from "../components/Button";
import { authenticate } from "../services/authService";
import { saveSession } from "../services/storageService";
import { RootStackParamList } from "../navigation/AppNavigator";
import { colors } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailError, setEmailError] = useState("");
  const [senhaError, setSenhaError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setEmailError(""); setSenhaError(""); setLoginError("");
    let valid = true;
    if (!email.trim()) { setEmailError("Informe o e-mail."); valid = false; }
    if (!senha.trim()) { setSenhaError("Informe a senha."); valid = false; }
    if (!valid) return;

    setLoading(true);
    try {
      const session = authenticate(email, senha);
      if (!session) { setLoginError("E-mail ou senha incorretos."); return; }
      await saveSession(session);
      navigation.replace("Occurrences");
    } catch (error) {
      console.error("Erro no login:", error);
      setLoginError("Não foi possível realizar o login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.brandBlock}>
          <View style={styles.brandMark}>
            <View style={styles.markTop} />
            <View style={styles.markBottom} />
          </View>
          <Text style={styles.overline}>PLATAFORMA DE MONITORAMENTO</Text>
          <Text style={styles.title}>Nuclear <Text style={styles.titleAccent}>Sentinel</Text></Text>
          <Text style={styles.subtitle}>Registro e acompanhamento de ocorrências em ambientes críticos.</Text>
        </View>

        <View style={styles.panel}>
          <View style={styles.panelHeading}>
            <Text style={styles.panelTitle}>Acesso ao sistema</Text>
            <Text style={styles.panelCaption}>Entre com suas credenciais para continuar.</Text>
          </View>
          <Input label="E-mail institucional" placeholder="nome@empresa.com" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} value={email} onChangeText={setEmail} error={emailError} />
          <Input label="Senha" placeholder="Digite sua senha" secureTextEntry value={senha} onChangeText={setSenha} error={senhaError} />
          {loginError ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorHeading}>Falha na autenticação</Text>
              <Text style={styles.errorText}>{loginError}</Text>
            </View>
          ) : null}
          <Button title="Acessar plataforma" onPress={handleLogin} loading={loading} />
          <View style={styles.credentials}>
            <Text style={styles.credentialsTitle}>AMBIENTE DE DEMONSTRAÇÃO</Text>
            <Text style={styles.credentialsText}>Operador: operador@nuclearsentinel.com</Text>
            <Text style={styles.credentialsText}>Supervisor: supervisor@nuclearsentinel.com</Text>
            <Text style={styles.credentialsText}>Senha de teste: 123456</Text>
          </View>
        </View>
        <Text style={styles.footer}>NUCLEAR SENTINEL  ·  MVP SPRINT 1</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, justifyContent: "center", paddingHorizontal: 23, paddingVertical: 35 },
  brandBlock: { alignItems: "center", marginBottom: 29 },
  brandMark: { width: 56, height: 56, borderRadius: 14, borderWidth: 1, borderColor: colors.primaryLight, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center", marginBottom: 17 },
  markTop: { width: 19, height: 19, borderWidth: 3, borderColor: colors.primaryLight, borderRadius: 10, marginBottom: -2 },
  markBottom: { width: 27, height: 12, borderTopWidth: 3, borderLeftWidth: 3, borderRightWidth: 3, borderColor: colors.primaryLight, borderTopLeftRadius: 7, borderTopRightRadius: 7 },
  overline: { color: colors.primaryLight, fontSize: 9, fontWeight: "800", letterSpacing: 2, marginBottom: 8 },
  title: { color: colors.text, fontSize: 30, fontWeight: "800", letterSpacing: -0.8 },
  titleAccent: { color: colors.primaryLight },
  subtitle: { color: colors.textSecondary, fontSize: 13, lineHeight: 20, textAlign: "center", marginTop: 9, maxWidth: 290 },
  panel: { backgroundColor: colors.backgroundAlt, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 20 },
  panelHeading: { marginBottom: 22 },
  panelTitle: { color: colors.text, fontSize: 18, fontWeight: "700" },
  panelCaption: { color: colors.textMuted, fontSize: 12, marginTop: 5 },
  errorBox: { backgroundColor: colors.dangerSurface, borderWidth: 1, borderColor: colors.critical, borderRadius: 7, padding: 12, marginBottom: 10 },
  errorHeading: { color: "#F0A5A5", fontWeight: "800", fontSize: 12 },
  errorText: { color: colors.text, fontSize: 12, marginTop: 4 },
  credentials: { borderTopWidth: 1, borderTopColor: colors.border, marginTop: 17, paddingTop: 15 },
  credentialsTitle: { color: colors.textMuted, fontSize: 9, fontWeight: "800", letterSpacing: 1.2, marginBottom: 7 },
  credentialsText: { color: colors.textSecondary, fontSize: 10, lineHeight: 17 },
  footer: { color: colors.textMuted, fontSize: 9, fontWeight: "700", letterSpacing: 1.4, textAlign: "center", marginTop: 24 },
});