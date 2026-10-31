import React, {
  useCallback,
  useState,
} from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";

import AlertBadge from "../components/AlertBadge";
import { RootStackParamList } from "../navigation/AppNavigator";
import { getOccurrences } from "../services/storageService";
import { Ocorrencia } from "../types";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "OccurrenceDetails"
>;

export default function OccurrenceDetailsScreen({
  route,
}: Props) {
  const [occurrence, setOccurrence] =
    useState<Ocorrencia | null>(null);

  const [loading, setLoading] =
    useState(true);

  const loadOccurrence =
    useCallback(async () => {
      setLoading(true);

      try {
        const occurrences =
          await getOccurrences();

        const found =
          occurrences.find(
            (item) =>
              item.id ===
              route.params.occurrenceId
          );

        setOccurrence(
          found ?? null
        );
      } finally {
        setLoading(false);
      }
    }, [route.params.occurrenceId]);

  useFocusEffect(
    useCallback(() => {
      loadOccurrence();
    }, [loadOccurrence])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#2F80B7"
        />
      </View>
    );
  }

  if (!occurrence) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>
          Ocorrência não encontrada.
        </Text>
      </View>
    );
  }

  const classificationColor =
    occurrence.nivelAlerta ===
    "critica"
      ? "#D64545"
      : occurrence.nivelAlerta ===
        "atipica"
      ? "#D99A2B"
      : "#2E9B62";

  return (
    <ScrollView
      style={styles.container}
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {occurrence.titulo}
          </Text>

          <AlertBadge
            level={
              occurrence.nivelAlerta
            }
          />
        </View>

        <View style={styles.separator} />

        <Info
          label="Descrição"
          value={occurrence.descricao}
        />

        <Info
          label="Local"
          value={occurrence.local}
        />

        <Info
          label="Tipo"
          value={occurrence.tipo}
        />

        <Info
          label="Status"
          value={occurrence.status.replace(
            "_",
            " "
          )}
        />

        <Info
          label="Data e hora"
          value={new Date(
            occurrence.dataHora
          ).toLocaleString("pt-BR")}
        />

        <Info
          label="Registrado por"
          value={
            occurrence.criadoPorNome
          }
        />

        <View
          style={[
            styles.classification,
            {
              borderColor:
                classificationColor,
            },
          ]}
        >
          <Text
            style={
              styles.classificationTitle
            }
          >
            Classificação do sistema
          </Text>

          <Text
            style={[
              styles.classificationValue,
              {
                color:
                  classificationColor,
              },
            ]}
          >
            {occurrence.nivelAlerta.toUpperCase()}
          </Text>

          <Text
            style={
              styles.classificationText
            }
          >
            A classificação foi gerada
            automaticamente pelas regras
            de análise do MVP.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.info}>
      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071A2B",
  },

  card: {
    margin: 16,
    backgroundColor: "#0D2A40",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#2A5068",
  },

  header: {
    gap: 12,
  },

  title: {
    color: "#E6EEF2",
    fontSize: 24,
    fontWeight: "800",
  },

  separator: {
    height: 1,
    backgroundColor: "#2A5068",
    marginVertical: 18,
  },

  info: {
    marginBottom: 17,
  },

  label: {
    color: "#718A99",
    fontSize: 12,
    marginBottom: 5,
    textTransform: "uppercase",
  },

  value: {
    color: "#E6EEF2",
    fontSize: 15,
    lineHeight: 21,
    textTransform: "capitalize",
  },

  classification: {
    marginTop: 5,
    backgroundColor: "#123B56",
    borderWidth: 2,
    borderRadius: 12,
    padding: 15,
  },

  classificationTitle: {
    color: "#E6EEF2",
    fontWeight: "700",
  },

  classificationValue: {
    fontSize: 20,
    fontWeight: "900",
    marginTop: 7,
  },

  classificationText: {
    color: "#9FB4C0",
    marginTop: 5,
    lineHeight: 19,
  },

  center: {
    flex: 1,
    backgroundColor: "#071A2B",
    alignItems: "center",
    justifyContent: "center",
  },

  notFound: {
    color: "#E6EEF2",
    fontSize: 16,
  },
});