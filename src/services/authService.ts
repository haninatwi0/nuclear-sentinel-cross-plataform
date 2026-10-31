import { usuarios } from "../data/users";
import { AuthSession, Usuario } from "../types";

export function authenticate(
  email: string,
  senha: string
): AuthSession | null {
  const usuario: Usuario | undefined = usuarios.find(
    (item) =>
      item.email.toLowerCase() === email.trim().toLowerCase() &&
      item.senha === senha
  );

  if (!usuario) {
    return null;
  }

  return {
    usuarioId: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    papel: usuario.papel,
  };
}