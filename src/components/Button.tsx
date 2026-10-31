import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  secondary?: boolean;
};

export default function Button({
  title,
  onPress,
  loading = false,
  secondary = false,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={[
        styles.button,
        secondary
          ? styles.secondary
          : styles.primary,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#E6EEF2" />
      ) : (
        <Text style={styles.text}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 6,
  },

  primary: {
    backgroundColor: "#2F80B7",
  },

  secondary: {
    backgroundColor: "#123B56",
    borderWidth: 1,
    borderColor: "#2A5068",
  },

  text: {
    color: "#E6EEF2",
    fontWeight: "700",
    fontSize: 15,
  },
});