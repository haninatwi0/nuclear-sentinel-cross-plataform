import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthSession, Ocorrencia } from "../types";
import { ocorrenciasIniciais } from "../data/occurrences";

const OCCURRENCES_KEY = "@nuclear_sentinel_occurrences";
const SESSION_KEY = "@nuclear_sentinel_session";
const INITIALIZED_KEY = "@nuclear_sentinel_initialized";

export async function initializeStorage(): Promise<void> {
  const initialized = await AsyncStorage.getItem(
    INITIALIZED_KEY
  );

  if (!initialized) {
    await AsyncStorage.setItem(
      OCCURRENCES_KEY,
      JSON.stringify(ocorrenciasIniciais)
    );

    await AsyncStorage.setItem(
      INITIALIZED_KEY,
      "true"
    );
  }
}

export async function getOccurrences(): Promise<Ocorrencia[]> {
  const data = await AsyncStorage.getItem(
    OCCURRENCES_KEY
  );

  if (!data) {
    return ocorrenciasIniciais;
  }

  return JSON.parse(data);
}

export async function saveOccurrences(
  occurrences: Ocorrencia[]
): Promise<void> {
  await AsyncStorage.setItem(
    OCCURRENCES_KEY,
    JSON.stringify(occurrences)
  );
}

export async function addOccurrence(
  occurrence: Ocorrencia
): Promise<void> {
  const occurrences = await getOccurrences();

  occurrences.unshift(occurrence);

  await saveOccurrences(occurrences);
}

export async function saveSession(
  session: AuthSession
): Promise<void> {
  await AsyncStorage.setItem(
    SESSION_KEY,
    JSON.stringify(session)
  );
}

export async function getSession(): Promise<AuthSession | null> {
  const data = await AsyncStorage.getItem(
    SESSION_KEY
  );

  if (!data) {
    return null;
  }

  return JSON.parse(data);
}

export async function clearSession(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
}

export async function resetOccurrences(): Promise<void> {
  await AsyncStorage.setItem(
    OCCURRENCES_KEY,
    JSON.stringify(ocorrenciasIniciais)
  );
}