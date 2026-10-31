import React from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { colors } from "../theme";

type Props = TextInputProps & { label: string; error?: string };

export default function Input({ label, error, ...props }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        style={[styles.input, props.multiline && styles.multiline, error && styles.inputError, props.style]}
        placeholderTextColor={colors.textMuted}
        selectionColor={colors.primaryLight}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 17 },
  label: { color: colors.textSecondary, fontSize: 11, fontWeight: "800", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 },
  input: {
    minHeight: 49, backgroundColor: colors.input, borderWidth: 1, borderColor: colors.border,
    borderRadius: 7, paddingHorizontal: 14, paddingVertical: 12, color: colors.text, fontSize: 14,
  },
  multiline: { minHeight: 116, textAlignVertical: "top" },
  inputError: { borderColor: colors.critical },
  error: { color: "#F08B8B", fontSize: 12, marginTop: 6 },
});
