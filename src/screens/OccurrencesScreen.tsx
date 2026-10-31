import React, {
  useCallback,
  useState,
} from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";

import OccurrenceCard from "../components/OccurrenceCard";
import Button from "../components/Button";
import { RootStackParamList } from "../navigation/AppNavigator";
import {
  clearSession,
  getOccurrences,
  resetOccurrences,
} from "../services/storageService";
import { Ocorrencia } from "../types";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Occurrences"
>;

export default function OccurrencesScreen({
  navigation,
}: Props) {
  const [occurrences, setOccurrences] =
    useState<Ocorrencia[]>([]);

  const [search, setSearch] =
    useState("");

  const [refreshing, setRefreshing] =
    useState(false);

  const loadOccurrences =
    useCallback(async () => {
      try {
        const data =
          await getOccurrences();

        setOccurrences(data);
      } catch (error) {
        console.error(
          "Erro ao carregar ocorrências:",
          error
        );
      }
    }, []);

  useFocusEffect(
    useCallback(() => {
      loadOccurrences();
    }, [loadOccurrences])
  );

  async function handleLogout() {
    await clearSession();

    navigation.replace("Login");
  }

  async function handleReset() {
    await resetOccurrences();

    await loadOccurrences();
  }

  async function refresh() {
    setRefreshing(true);

    await loadOccurrences();

    setRefreshing(false);
  }

  const filteredOccurrences =
    occurrences.filter((item) => {
      const text = `
        ${item.titulo}
        ${item.descricao}
        ${item.local}
        ${item.nivelAlerta}
        ${item.status}
      `.toLowerCase();

      return text.includes(
        search.toLowerCase()
      );
    });

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View>
          <Text style={styles.title}>
            Monitoramento
          </Text>

          <Text style={styles.subtitle}>
            Ocorrências registradas na instalação
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          style={styles.logout}
        >
          <Text style={styles.logoutText}>
            Sair
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar ocorrência..."
        placeholderTextColor="#718A99"
        style={styles.search}
      />

      <View style={styles.actions}>
        <Text style={styles.count}>
          {filteredOccurrences.length}{" "}
          ocorrência(s)
        </Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate(
              "NewOccurrence"
            )
          }
        >
          <Text style={styles.addText}>
            + Nova
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.resetButton}
        onPress={handleReset}
      >
        <Text style={styles.resetText}>
          Resetar dados de teste
        </Text>
      </TouchableOpacity>

      <FlatList
        data={filteredOccurrences}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OccurrenceCard
            occurrence={item}
            onPress={() =>
              navigation.navigate(
                "OccurrenceDetails",
                {
                  occurrenceId: item.id,
                }
              )
            }
          />
        )}
        contentContainerStyle={
          filteredOccurrences.length === 0
            ? styles.emptyContainer
            : styles.list
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor="#2F80B7"
          />
        }
        ListEmptyComponent={
          <View>
            <Text style={styles.emptyTitle}>
              Nenhuma ocorrência encontrada
            </Text>

            <Text style={styles.emptyText}>
              Cadastre uma nova ocorrência
              para começar.
            </Text>

            <Button
              title="Cadastrar ocorrência"
              onPress={() =>
                navigation.navigate(
                  "NewOccurrence"
                )
              }
            />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071A2B",
    paddingHorizontal: 16,
  },

  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 14,
  },

  title: {
    color: "#E6EEF2",
    fontSize: 23,
    fontWeight: "800",
  },

  subtitle: {
    color: "#9FB4C0",
    marginTop: 4,
    fontSize: 12,
  },

  logout: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  logoutText: {
    color: "#D64545",
    fontWeight: "700",
  },

  search: {
    backgroundColor: "#0D2A40",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2A5068",
    color: "#E6EEF2",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },

  count: {
    color: "#9FB4C0",
    fontSize: 13,
  },

  addButton: {
    backgroundColor: "#2F80B7",
    borderRadius: 9,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },

  addText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  resetButton: {
    borderWidth: 1,
    borderColor: "#2A5068",
    backgroundColor: "#0D2A40",
    borderRadius: 9,
    paddingVertical: 9,
    alignItems: "center",
    marginBottom: 12,
  },

  resetText: {
    color: "#9FB4C0",
    fontSize: 12,
    fontWeight: "700",
  },

  list: {
    paddingBottom: 30,
  },

  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 80,
  },

  emptyTitle: {
    color: "#E6EEF2",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },

  emptyText: {
    color: "#9FB4C0",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 18,
  },
});