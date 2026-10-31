import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NivelAlerta } from "../types";

type Props = {
  level: NivelAlerta;
};

const labels: Record<NivelAlerta, string> = {
  normal: "NORMAL",
  atipica: "ATÍPICA",
  critica: "CRÍTICA",
};

export default function AlertBadge({
  level,
}: Props) {
  return (
    <View
      style={[
        styles.badge,
        styles[level],
      ]}
    >
      <Text style={styles.text}>
        {labels[level]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 6,
    alignSelf: "flex-start",
  },

  normal: {
    backgroundColor: "#2E9B62",
  },

  atipica: {
    backgroundColor: "#D99A2B",
  },

  critica: {
    backgroundColor: "#D64545",
  },

  text: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 11,
    letterSpacing: 0.4,
  },
});