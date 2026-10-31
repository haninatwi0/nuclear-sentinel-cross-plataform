import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Input from "../components/Input";
import Button from "../components/Button";
import { RootStackParamList } from "../navigation/AppNavigator";
import {
  addOccurrence,
  getSession,
} from "../services/storageService";
import { classifyAlert } from "../utils/alertClassifier";
import {
  NovaOcorrencia,
  StatusOcorrencia,
  TipoOcorrencia,
} from "../types";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "NewOccurrence"
>;

const tipos: {
  value: TipoOcorrencia;
  label: string;
}[] = [
  {
    value: "temperatura",
    label: "Temperatura",
  },
  {
    value: "radiacao",
    label: "Radiação",
  },
  {
    value: "sensor",
    label: "Sensor",
  },
  {
    value: "estrutura",
    label: "Estrutura",
  },
  {
    value: "seguranca",
    label: "Segurança",
  },
  {
    value: "outro",
    label: "Outro",
  },
];

const statusOptions: {
  value: StatusOcorrencia;
  label: string;
}[] = [
  {
    value: "aberta",
    label: "Aberta",
  },
  {
    value: "em_analise",
    label: "Em análise",
  },
  {
    value: "resolvida",
    label: "Resolvida",
  },
];

export default function NewOccurrenceScreen({
  navigation,
}: Props) {
  const [titulo, setTitulo] =
    useState("");

  const [descricao, setDescricao] =
    useState("");

  const [local, setLocal] =
    useState("");

  const [tipo, setTipo] =
    useState<TipoOcorrencia>("sensor");

  const [status, setStatus] =
    useState<StatusOcorrencia>("aberta");

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  const [loading, setLoading] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [classification, setClassification] =
    useState("");

  function validate(): boolean {
    const newErrors: Record<
      string,
      string
    > = {};

    if (!titulo.trim()) {
      newErrors.titulo =
        "Informe o título.";
    }

    if (!descricao.trim()) {
      newErrors.descricao =
        "Informe a descrição.";
    }

    if (!local.trim()) {
      newErrors.local =
        "Informe o local.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  }

  async function handleSubmit() {
    setSuccessMessage("");
    setClassification("");

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const session =
        await getSession();

      if (!session) {
        setErrors({
          session:
            "Sua sessão não foi encontrada. Faça login novamente.",
        });

        navigation.replace("Login");

        return;
      }

      const data: NovaOcorrencia = {
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        local: local.trim(),
        tipo,
        status,
      };

      const nivelAlerta =
        classifyAlert(
          data.tipo,
          data.descricao
        );

      const occurrence = {
        id: `occ-${Date.now()}`,
        ...data,
        nivelAlerta,
        dataHora:
          new Date().toISOString(),
        criadoPor: session.usuarioId,
        criadoPorNome: session.nome,
      };

      await addOccurrence(
        occurrence
      );

      setClassification(
        nivelAlerta.toUpperCase()
      );

      setSuccessMessage(
        "Ocorrência registrada com sucesso."
      );

      setTitulo("");
      setDescricao("");
      setLocal("");
      setTipo("sensor");
      setStatus("aberta");
      setErrors({});
    } catch (error) {
      console.error(
        "Erro ao registrar ocorrência:",
        error
      );

      setErrors({
        general:
          "Não foi possível registrar a ocorrência. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  }

  const classificationColor =
    classification === "CRÍTICA"
      ? "#D64545"
      : classification === "ATÍPICA"
      ? "#D99A2B"
      : "#2E9B62";

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
        <Text style={styles.sectionTitle}>
          Registrar ocorrência
        </Text>

        <Text style={styles.description}>
          Informe os dados observados
          durante o monitoramento da
          instalação.
        </Text>

        <Input
          label="Título *"
          placeholder="Ex.: Variação de temperatura"
          value={titulo}
          onChangeText={setTitulo}
          error={errors.titulo}
        />

        <Input
          label="Descrição *"
          placeholder="Descreva o que foi identificado..."
          value={descricao}
          onChangeText={setDescricao}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          error={errors.descricao}
          style={styles.textArea}
        />

        <Input
          label="Local *"
          placeholder="Ex.: Setor B - Área Técnica"
          value={local}
          onChangeText={setLocal}
          error={errors.local}
        />

        <Text style={styles.label}>
          Tipo de ocorrência *
        </Text>

        <View style={styles.options}>
          {tipos.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={[
                styles.option,
                tipo === item.value &&
                  styles.optionSelected,
              ]}
              onPress={() =>
                setTipo(item.value)
              }
            >
              <Text
                style={[
                  styles.optionText,
                  tipo === item.value &&
                    styles.optionTextSelected,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>
          Status *
        </Text>

        <View style={styles.options}>
          {statusOptions.map(
            (item) => (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.option,
                  status ===
                    item.value &&
                    styles.optionSelected,
                ]}
                onPress={() =>
                  setStatus(
                    item.value
                  )
                }
              >
                <Text
                  style={[
                    styles.optionText,
                    status ===
                      item.value &&
                      styles.optionTextSelected,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        <View style={styles.info}>
          <Text style={styles.infoTitle}>
            Classificação automática
          </Text>

          <Text style={styles.infoText}>
            O sistema analisa a descrição
            e classifica a ocorrência como
            Normal, Atípica ou Crítica.
          </Text>
        </View>

        {errors.general ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>
              {errors.general}
            </Text>
          </View>
        ) : null}

        {successMessage ? (
          <View
            style={[
              styles.successBox,
              {
                borderColor:
                  classificationColor,
              },
            ]}
          >
            <Text
              style={styles.successTitle}
            >
              {successMessage}
            </Text>

            <Text
              style={styles.successText}
            >
              Nível de alerta:
            </Text>

            <Text
              style={[
                styles.classification,
                {
                  color:
                    classificationColor,
                },
              ]}
            >
              {classification}
            </Text>
          </View>
        ) : null}

        <Button
          title="Registrar ocorrência"
          onPress={handleSubmit}
          loading={loading}
        />

        {successMessage ? (
          <Button
            title="Voltar para ocorrências"
            onPress={() =>
              navigation.goBack()
            }
            secondary
          />
        ) : null}
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
    padding: 20,
    paddingBottom: 40,
  },

  sectionTitle: {
    color: "#E6EEF2",
    fontSize: 23,
    fontWeight: "800",
  },

  description: {
    color: "#9FB4C0",
    marginTop: 6,
    marginBottom: 22,
    lineHeight: 20,
  },

  textArea: {
    minHeight: 110,
  },

  label: {
    color: "#E6EEF2",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 9,
    marginTop: 4,
  },

  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },

  option: {
    backgroundColor: "#0D2A40",
    borderWidth: 1,
    borderColor: "#2A5068",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  optionSelected: {
    backgroundColor: "#2F80B7",
    borderColor: "#2F80B7",
  },

  optionText: {
    color: "#9FB4C0",
    fontSize: 13,
  },

  optionTextSelected: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  info: {
    backgroundColor: "#0D2A40",
    borderWidth: 1,
    borderColor: "#2A5068",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },

  infoTitle: {
    color: "#E6EEF2",
    fontWeight: "700",
  },

  infoText: {
    color: "#9FB4C0",
    marginTop: 5,
    lineHeight: 19,
  },

  errorBox: {
    backgroundColor: "#3A1D24",
    borderWidth: 1,
    borderColor: "#D64545",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },

  errorText: {
    color: "#F2B8B8",
    fontWeight: "600",
  },

  successBox: {
    backgroundColor: "#0D2A40",
    borderWidth: 2,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },

  successTitle: {
    color: "#E6EEF2",
    fontSize: 15,
    fontWeight: "800",
  },

  successText: {
    color: "#9FB4C0",
    marginTop: 8,
  },

  classification: {
    fontSize: 24,
    fontWeight: "900",
    marginTop: 4,
  },
});