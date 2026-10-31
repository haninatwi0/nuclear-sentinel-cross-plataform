import React, { useState } from "react";
import {
  KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Input from "../components/Input";
import Button from "../components/Button";
import { RootStackParamList } from "../navigation/AppNavigator";
import { addOccurrence, getSession } from "../services/storageService";
import { classifyAlert } from "../utils/alertClassifier";
import { NovaOcorrencia, StatusOcorrencia, TipoOcorrencia } from "../types";
import { colors } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "NewOccurrence">;

const tipos: { value: TipoOcorrencia; label: string }[] = [
  { value: "temperatura", label: "Temperatura" },
  { value: "radiacao", label: "Radiação" },
  { value: "sensor", label: "Sensor" },
  { value: "estrutura", label: "Estrutura" },
  { value: "seguranca", label: "Segurança" },
  { value: "outro", label: "Outro" },
];
const statusOptions: { value: StatusOcorrencia; label: string }[] = [
  { value: "aberta", label: "Aberta" },
  { value: "em_analise", label: "Em análise" },
  { value: "resolvida", label: "Resolvida" },
];

export default function NewOccurrenceScreen({ navigation }: Props) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [local, setLocal] = useState("");
  const [tipo, setTipo] = useState<TipoOcorrencia>("sensor");
  const [status, setStatus] = useState<StatusOcorrencia>("aberta");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [classification, setClassification] = useState("");

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!titulo.trim()) next.titulo = "Informe o título.";
    if (!descricao.trim()) next.descricao = "Informe a descrição.";
    if (!local.trim()) next.local = "Informe o local.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit() {
    setSuccessMessage(""); setClassification("");
    if (!validate()) return;
    setLoading(true);
    try {
      const session = await getSession();
      if (!session) {
        setErrors({ session: "Sua sessão não foi encontrada. Faça login novamente." });
        navigation.replace("Login");
        return;
      }
      const data: NovaOcorrencia = {
        titulo: titulo.trim(), descricao: descricao.trim(), local: local.trim(), tipo, status,
      };
      const nivelAlerta = classifyAlert(data.tipo, data.descricao);
      const occurrence = {
        id: `occ-${Date.now()}`, ...data, nivelAlerta,
        dataHora: new Date().toISOString(),
        criadoPor: session.usuarioId, criadoPorNome: session.nome,
      };
      await addOccurrence(occurrence);
      setClassification(nivelAlerta.toUpperCase());
      setSuccessMessage("Ocorrência registrada com sucesso.");
      setTitulo(""); setDescricao(""); setLocal("");
      setTipo("sensor"); setStatus("aberta"); setErrors({});
    } catch (error) {
      console.error("Erro ao registrar ocorrência:", error);
      setErrors({ general: "Não foi possível registrar a ocorrência. Tente novamente." });
    } finally {
      setLoading(false);
    }
  }

  const classificationColor = classification === "CRÍTICA" ? colors.critical : classification === "ATÍPICA" ? colors.atypical : colors.normal;

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.eyebrow}>CENTRO DE OPERAÇÕES  /  NOVO REGISTRO</Text>
        <Text style={styles.title}>Registrar ocorrência</Text>
        <Text style={styles.subtitle}>Preencha as informações observadas. Os campos marcados com * são obrigatórios.</Text>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>01  ·  IDENTIFICAÇÃO</Text>
          <Input label="Título *" placeholder="Ex.: Variação de temperatura" value={titulo} onChangeText={setTitulo} error={errors.titulo} />
          <Input label="Descrição da ocorrência *" placeholder="Descreva o que foi identificado durante o monitoramento..." value={descricao} onChangeText={setDescricao} multiline numberOfLines={5} error={errors.descricao} />
          <Input label="Local *" placeholder="Ex.: Setor B - Área Técnica" value={local} onChangeText={setLocal} error={errors.local} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>02  ·  CLASSIFICAÇÃO E STATUS</Text>
          <Text style={styles.label}>Tipo de ocorrência *</Text>
          <View style={styles.options}>
            {tipos.map((item) => (
              <TouchableOpacity key={item.value} style={[styles.option, tipo === item.value && styles.optionSelected]} onPress={() => setTipo(item.value)}>
                <Text style={[styles.optionText, tipo === item.value && styles.optionTextSelected]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.label}>Status inicial *</Text>
          <View style={styles.options}>
            {statusOptions.map((item) => (
              <TouchableOpacity key={item.value} style={[styles.option, status === item.value && styles.optionSelected]} onPress={() => setStatus(item.value)}>
                <Text style={[styles.optionText, status === item.value && styles.optionTextSelected]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.infoPanel}>
            <View style={styles.infoMark}><Text style={styles.infoMarkText}>i</Text></View>
            <View style={styles.infoCopy}>
              <Text style={styles.infoTitle}>Classificação automática</Text>
              <Text style={styles.infoText}>Após o registro, o sistema analisa a descrição e atribui um nível: Normal, Atípica ou Crítica.</Text>
            </View>
          </View>
        </View>

        {errors.general ? <View style={styles.errorBox}><Text style={styles.errorText}>{errors.general}</Text></View> : null}
        {successMessage ? (
          <View style={[styles.successBox, { borderColor: classificationColor }]}>
            <Text style={styles.successTitle}>{successMessage}</Text>
            <Text style={styles.successCaption}>NÍVEL DE ALERTA ATRIBUÍDO</Text>
            <Text style={[styles.classification, { color: classificationColor }]}>{classification}</Text>
          </View>
        ) : null}
        <Button title="Registrar ocorrência" onPress={handleSubmit} loading={loading} />
        {successMessage ? <Button title="Voltar para ocorrências" onPress={() => navigation.goBack()} secondary /> : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 18, paddingBottom: 38 },
  eyebrow: { color: colors.primaryLight, fontSize: 8, fontWeight: "800", letterSpacing: 1.2, marginBottom: 8 },
  title: { color: colors.text, fontSize: 24, fontWeight: "800", letterSpacing: -0.5 },
  subtitle: { color: colors.textSecondary, fontSize: 12, lineHeight: 18, marginTop: 7, marginBottom: 22 },
  section: { backgroundColor: colors.backgroundAlt, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 15, marginBottom: 14 },
  sectionHeading: { color: colors.primaryLight, fontSize: 9, fontWeight: "800", letterSpacing: 1.1, marginBottom: 17 },
  label: { color: colors.textSecondary, fontSize: 10, fontWeight: "800", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 9, marginTop: 2 },
  options: { flexDirection: "row", flexWrap: "wrap", gap: 7, marginBottom: 17 },
  option: { backgroundColor: colors.input, borderWidth: 1, borderColor: colors.border, borderRadius: 6, paddingHorizontal: 11, paddingVertical: 10 },
  optionSelected: { backgroundColor: "#123E59", borderColor: colors.primaryLight },
  optionText: { color: colors.textSecondary, fontSize: 11, fontWeight: "600" },
  optionTextSelected: { color: colors.text, fontWeight: "800" },
  infoPanel: { flexDirection: "row", backgroundColor: "#0C2A3D", borderWidth: 1, borderColor: colors.border, borderRadius: 7, padding: 12, gap: 10 },
  infoMark: { width: 19, height: 19, borderRadius: 10, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" },
  infoMarkText: { color: colors.white, fontWeight: "800", fontSize: 12 },
  infoCopy: { flex: 1 },
  infoTitle: { color: colors.text, fontWeight: "700", fontSize: 12 },
  infoText: { color: colors.textSecondary, fontSize: 11, lineHeight: 17, marginTop: 4 },
  errorBox: { backgroundColor: colors.dangerSurface, borderWidth: 1, borderColor: colors.critical, borderRadius: 7, padding: 12, marginBottom: 10 },
  errorText: { color: "#F0A5A5", fontSize: 12, fontWeight: "600" },
  successBox: { backgroundColor: colors.backgroundAlt, borderWidth: 1, borderRadius: 8, padding: 15, marginBottom: 12 },
  successTitle: { color: colors.text, fontSize: 13, fontWeight: "700" },
  successCaption: { color: colors.textMuted, fontSize: 9, fontWeight: "800", letterSpacing: 1, marginTop: 12 },
  classification: { fontSize: 22, fontWeight: "900", marginTop: 4 },
});