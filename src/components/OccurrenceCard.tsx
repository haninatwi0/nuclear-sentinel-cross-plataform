import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ocorrencia } from "../types";
import AlertBadge from "./AlertBadge";

type Props = {
  occurrence: Ocorrencia;
  onPress: () => void;
};

export default function OccurrenceCard({
  occurrence,
  onPress,
}: Props) {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text
          style={styles.title}
          numberOfLines={1}
        >
          {occurrence.titulo}
        </Text>

        <AlertBadge
          level={occurrence.nivelAlerta}
        />
      </View>

      <Text style={styles.location}>
        📍 {occurrence.local}
      </Text>

      <Text
        style={styles.description}
        numberOfLines={2}
      >
        {occurrence.descricao}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.status}>
          Status:{" "}
          {occurrence.status.replace(
            "_",
            " "
          )}
        </Text>

        <Text style={styles.date}>
          {new Date(
            occurrence.dataHora
          ).toLocaleDateString("pt-BR")}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0D2A40",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#2A5068",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
  },

  title: {
    flex: 1,
    color: "#E6EEF2",
    fontSize: 16,
    fontWeight: "700",
  },

  location: {
    color: "#9FB4C0",
    marginTop: 10,
    fontSize: 13,
  },

  description: {
    color: "#C5D2D9",
    marginTop: 8,
    lineHeight: 20,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },

  status: {
    color: "#9FB4C0",
    textTransform: "capitalize",
    fontSize: 12,
  },

  date: {
    color: "#9FB4C0",
    fontSize: 12,
  },
});