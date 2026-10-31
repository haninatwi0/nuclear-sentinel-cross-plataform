import React, { useCallback, useState } from "react";
import {
  FlatList, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import OccurrenceCard from "../components/OccurrenceCard";
import Button from "../components/Button";
import { RootStackParamList } from "../navigation/AppNavigator";
import { clearSession, getOccurrences } from "../services/storageService";
import { Ocorrencia } from "../types";
import { colors } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "Occurrences">;

export default function OccurrencesScreen({ navigation }: Props) {
  const [occurrences, setOccurrences] = useState<Ocorrencia[]>([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const loadOccurrences = useCallback(async () => {
    try { setOccurrences(await getOccurrences()); }
    catch (error) { console.error("Erro ao carregar ocorrências:", error); }
  }, []);

  useFocusEffect(useCallback(() => { loadOccurrences(); }, [loadOccurrences]));

  async function handleLogout() {
    await clearSession();
    navigation.replace("Login");
  }

  async function refresh() {
    setRefreshing(true);
    await loadOccurrences();
    setRefreshing(false);
  }

  const filteredOccurrences = occurrences.filter((item) => {
    const text = `${item.titulo} ${item.descricao} ${item.local} ${item.nivelAlerta} ${item.status}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  const count = (level: string) => occurrences.filter((item) => item.nivelAlerta === level).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>CENTRO DE OPERAÇÕES  /  VISÃO GERAL</Text>
          <Text style={styles.title}>Monitoramento</Text>
          <Text style={styles.subtitle}>Acompanhamento de ocorrências registradas</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logout}>
          <Text style={styles.logoutText}>SAIR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.metrics}>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{occurrences.length}</Text>
          <Text style={styles.metricLabel}>TOTAL</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metric}>
          <Text style={[styles.metricValue, { color: colors.normal }]}>{count("normal")}</Text>
          <Text style={styles.metricLabel}>NORMAL</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metric}>
          <Text style={[styles.metricValue, { color: colors.atypical }]}>{count("atipica")}</Text>
          <Text style={styles.metricLabel}>ATÍPICA</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metric}>
          <Text style={[styles.metricValue, { color: colors.critical }]}>{count("critica")}</Text>
          <Text style={styles.metricLabel}>CRÍTICA</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Registro de ocorrências</Text>
          <Text style={styles.sectionSubtitle}>{filteredOccurrences.length} registro(s) encontrados</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("NewOccurrence")}>
          <Text style={styles.addButtonText}>＋  NOVA</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar por título, local ou classificação"
          placeholderTextColor={colors.textMuted}
          style={styles.search}
        />
      </View>

      <FlatList
        data={filteredOccurrences}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OccurrenceCard occurrence={item} onPress={() => navigation.navigate("OccurrenceDetails", { occurrenceId: item.id })} />
        )}
        contentContainerStyle={filteredOccurrences.length === 0 ? styles.emptyContainer : styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={colors.primaryLight} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Nenhuma ocorrência encontrada</Text>
            <Text style={styles.emptyText}>Ajuste a busca ou registre uma nova ocorrência.</Text>
            <Button title="Registrar ocorrência" onPress={() => navigation.navigate("NewOccurrence")} />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 17 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 19, paddingBottom: 17 },
  eyebrow: { color: colors.primaryLight, fontSize: 8, fontWeight: "800", letterSpacing: 1.2, marginBottom: 7 },
  title: { color: colors.text, fontSize: 25, fontWeight: "800", letterSpacing: -0.5 },
  subtitle: { color: colors.textSecondary, fontSize: 11, marginTop: 5 },
  logout: { borderWidth: 1, borderColor: colors.border, borderRadius: 6, paddingHorizontal: 12, paddingVertical: 9 },
  logoutText: { color: colors.textSecondary, fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  metrics: { flexDirection: "row", alignItems: "center", backgroundColor: colors.backgroundAlt, borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingVertical: 14, marginBottom: 22 },
  metric: { flex: 1, alignItems: "center" },
  metricValue: { color: colors.text, fontSize: 21, fontWeight: "800" },
  metricLabel: { color: colors.textMuted, fontSize: 8, fontWeight: "800", letterSpacing: 0.7, marginTop: 4 },
  metricDivider: { width: 1, height: 29, backgroundColor: colors.border },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 13 },
  sectionTitle: { color: colors.text, fontSize: 15, fontWeight: "700" },
  sectionSubtitle: { color: colors.textMuted, fontSize: 10, marginTop: 4 },
  addButton: { backgroundColor: colors.primary, borderRadius: 6, paddingHorizontal: 13, paddingVertical: 11 },
  addButtonText: { color: colors.white, fontSize: 10, fontWeight: "800", letterSpacing: 0.5 },
  searchWrap: { flexDirection: "row", alignItems: "center", backgroundColor: colors.input, borderWidth: 1, borderColor: colors.border, borderRadius: 7, paddingHorizontal: 12, marginBottom: 14 },
  searchIcon: { color: colors.textMuted, fontSize: 21, marginRight: 7 },
  search: { flex: 1, minHeight: 44, color: colors.text, fontSize: 12 },
  list: { paddingBottom: 28 },
  emptyContainer: { flexGrow: 1, justifyContent: "center", paddingBottom: 70 },
  empty: { alignItems: "center", paddingHorizontal: 18 },
  emptyTitle: { color: colors.text, fontSize: 16, fontWeight: "700", textAlign: "center" },
  emptyText: { color: colors.textSecondary, fontSize: 12, textAlign: "center", lineHeight: 18, marginTop: 7, marginBottom: 14 },
});
