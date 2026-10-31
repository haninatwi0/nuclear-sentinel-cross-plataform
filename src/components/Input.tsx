import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export default function Input({
  label,
  error,
  ...props
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        {...props}
        style={[
          styles.input,
          error
            ? styles.inputError
            : undefined,
        ]}
        placeholderTextColor="#718A99"
      />

      {error ? (
        <Text style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    color: "#E6EEF2",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 7,
  },

  input: {
    backgroundColor: "#0D2A40",
    borderWidth: 1,
    borderColor: "#2A5068",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#E6EEF2",
    fontSize: 15,
  },

  inputError: {
    borderColor: "#D64545",
  },

  error: {
    color: "#D64545",
    fontSize: 12,
    marginTop: 5,
  },
});