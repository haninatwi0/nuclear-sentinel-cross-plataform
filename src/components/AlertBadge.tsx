import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NivelAlerta } from "../types";
import { colors } from "../theme";

type Props = { level: NivelAlerta };

const labels: Record<NivelAlerta, string> = {
  normal: "NORMAL",
  atipica: "ATÍPICA",
  critica: "CRÍTICA",
};

const tones: Record<NivelAlerta, string> = {
  normal: colors.normal,
  atipica: colors.atypical,
  critica: colors.critical,
};

export default function AlertBadge({ level }: Props) {
  return (
    <View style={[styles.badge, { backgroundColor: `${tones[level]}20`, borderColor: `${tones[level]}80` }]}>
      <View style={[styles.dot, { backgroundColor: tones[level] }]} />
      <Text style={[styles.text, { color: tones[level] }]}>{labels[level]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 9,
    paddingVertical: 6,
    gap: 6,
  },
  dot: { width: 6, height: 6, borderRadius: 3 },
  text: { fontSize: 10, fontWeight: "800", letterSpacing: 0.8 },
});
