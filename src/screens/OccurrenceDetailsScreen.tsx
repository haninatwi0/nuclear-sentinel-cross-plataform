import React, { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import AlertBadge from "../components/AlertBadge";
import { RootStackParamList } from "../navigation/AppNavigator";
import { getOccurrences } from "../services/storageService";
import { Ocorrencia } from "../types";
import { colors } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "OccurrenceDetails">;

export default function OccurrenceDetailsScreen({ route }: Props) {
  const [occurrence, setOccurrence] = useState<Ocorrencia | null>(null);
  const [loading, setLoading] = useState(true);

  const loadOccurrence = useCallback(async () => {
    setLoading(true);
    try {
      const occurrences = await getOccurrences();
      setOccurrence(occurrences.find((item) => item.id === route.params.occurrenceId) ?? null);
    } finally { setLoading(false); }
  }, [route.params.occurrenceId]);

  useFocusEffect(useCallback(() => { loadOccurrence(); }, [loadOccurrence]));

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={colors.primaryLight} /></View>;
  if (!occurrence) return <View style={styles.center}><Text style={styles.notFound}>Ocorrência não encontrada.</Text></View>;

  const levelColor = occurrence.nivelAlerta === "critica" ? colors.critical : occurrence.nivelAlerta === "atipica" ? colors.atypical : colors.normal;
  const statusLabel = occurrence.status === "em_analise" ? "Em análise" : occurrence.status === "resolvida" ? "Resolvida" : "Aberta";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>REGISTRO  /  {occurrence.id.toUpperCase()}</Text>
      <View style={styles.hero}>
        <View style={styles.heroTop}><Text style={styles.heroLabel}>NÍVEL DE ALERTA</Text><AlertBadge level={occurrence.nivelAlerta} /></View>
        <Text style={styles.title}>{occurrence.titulo}</Text>
        <Text style={styles.heroMeta}>{occurrence.local}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações da ocorrência</Text>
        <Info label="Descrição" value={occurrence.descricao} />
        <View style={styles.twoColumns}>
          <View style={styles.column}><Info label="Tipo" value={occurrence.tipo} /></View>
          <View style={styles.column}><Info label="Status" value={statusLabel} /></View>
        </View>
        <View style={styles.twoColumns}>
          <View style={styles.column}><Info label="Data" value={new Date(occurrence.dataHora).toLocaleDateString("pt-BR")} /></View>
          <View style={styles.column}><Info label="Horário" value={new Date(occurrence.dataHora).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} /></View>
        </View>
        <Info label="Registrado por" value={occurrence.criadoPorNome} />
      </View>

      <View style={[styles.classificationPanel, { borderLeftColor: levelColor }]}>
        <Text style={styles.classificationEyebrow}>ANÁLISE AUTOMATIZADA</Text>
        <Text style={styles.classificationTitle}>Classificação do sistema</Text>
        <Text style={[styles.classificationValue, { color: levelColor }]}>{occurrence.nivelAlerta.toUpperCase()}</Text>
        <Text style={styles.classificationText}>O nível foi atribuído automaticamente pelas regras de análise implementadas neste MVP, com base no tipo e no conteúdo da descrição.</Text>
      </View>
    </ScrollView>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <View style={styles.info}><Text style={styles.infoLabel}>{label.toUpperCase()}</Text><Text style={styles.infoValue}>{value}</Text></View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 17, paddingBottom: 30 },
  eyebrow: { color: colors.primaryLight, fontSize: 8, fontWeight: "800", letterSpacing: 1.2, marginBottom: 10 },
  hero: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 9, padding: 17, marginBottom: 14 },
  heroTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
  heroLabel: { color: colors.textMuted, fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  title: { color: colors.text, fontSize: 21, fontWeight: "800", lineHeight: 27 },
  heroMeta: { color: colors.primaryLight, fontSize: 11, fontWeight: "700", marginTop: 10 },
  section: { backgroundColor: colors.backgroundAlt, borderWidth: 1, borderColor: colors.border, borderRadius: 9, padding: 16 },
  sectionTitle: { color: colors.text, fontSize: 14, fontWeight: "700", marginBottom: 17 },
  info: { marginBottom: 17 },
  infoLabel: { color: colors.textMuted, fontSize: 9, fontWeight: "800", letterSpacing: 0.9, marginBottom: 6 },
  infoValue: { color: colors.text, fontSize: 13, lineHeight: 20, textTransform: "capitalize" },
  twoColumns: { flexDirection: "row", gap: 14 },
  column: { flex: 1 },
  classificationPanel: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderLeftWidth: 3, borderRadius: 8, padding: 16, marginTop: 14 },
  classificationEyebrow: { color: colors.textMuted, fontSize: 8, fontWeight: "800", letterSpacing: 1.1 },
  classificationTitle: { color: colors.text, fontSize: 14, fontWeight: "700", marginTop: 8 },
  classificationValue: { fontSize: 22, fontWeight: "900", marginTop: 5 },
  classificationText: { color: colors.textSecondary, fontSize: 11, lineHeight: 17, marginTop: 8 },
  center: { flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center" },
  notFound: { color: colors.text, fontSize: 14 },
});
