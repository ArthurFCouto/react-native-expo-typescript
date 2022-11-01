export type ErrorApi = {
  error: string,
  details: {
    status: number,
    statusText: string,
    data: any
  }
}

export type UserLogin = {
  usuario: {
    emailUsuario: string,
    nomeUsuario: string
  },
  token: string | null
};

export type User = {
  usuario: {
    id: number,
    emailUsuario: string,
    nomeUsuario: string,
    imagemUsuario: string,
    senhaUsuario: string,
    telefoneUsuario: string,
    roleUsuario: string
  },
  token: string
}