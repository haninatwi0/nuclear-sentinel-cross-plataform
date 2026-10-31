import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ocorrencia } from "../types";
import AlertBadge from "./AlertBadge";
import { colors } from "../theme";

type Props = { occurrence: Ocorrencia; onPress: () => void };

const statusLabels: Record<string, string> = {
  aberta: "Aberta",
  em_analise: "Em análise",
  resolvida: "Resolvida",
};

export default function OccurrenceCard({ occurrence, onPress }: Props) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
      <View style={styles.topLine}>
        <Text style={styles.reference}>{occurrence.id.toUpperCase()}</Text>
        <AlertBadge level={occurrence.nivelAlerta} />
      </View>
      <Text style={styles.title} numberOfLines={2}>{occurrence.titulo}</Text>
      <Text style={styles.location} numberOfLines={1}>LOCAL  /  {occurrence.local}</Text>
      <Text style={styles.description} numberOfLines={2}>{occurrence.descricao}</Text>
      <View style={styles.divider} />
      <View style={styles.footer}>
        <View style={styles.statusWrap}>
          <View style={[styles.statusDot, { backgroundColor: occurrence.status === "resolvida" ? colors.normal : occurrence.status === "em_analise" ? colors.atypical : colors.primaryLight }]} />
          <Text style={styles.status}>{statusLabels[occurrence.status] ?? occurrence.status}</Text>
        </View>
        <Text style={styles.date}>{new Date(occurrence.dataHora).toLocaleDateString("pt-BR")}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 9, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  pressed: { opacity: 0.82 },
  topLine: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 13 },
  reference: { color: colors.textMuted, fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  title: { color: colors.text, fontSize: 17, fontWeight: "700", lineHeight: 23 },
  location: { color: colors.primaryLight, fontSize: 10, fontWeight: "800", letterSpacing: 0.7, marginTop: 12 },
  description: { color: colors.textSecondary, marginTop: 8, fontSize: 13, lineHeight: 19 },
  divider: { height: 1, backgroundColor: colors.border, marginTop: 15, marginBottom: 12 },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  statusWrap: { flexDirection: "row", alignItems: "center", gap: 7 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  status: { color: colors.textSecondary, fontSize: 11, fontWeight: "600" },
  date: { color: colors.textMuted, fontSize: 11 },
});
