interface Definition {
  label: string;
  posIds: number[];
  usages: string[];
  extResources: string[];
  origins: string[];
}

export interface GetDefinitions {
  defIds: number[];
  offset: number;
}

export interface NewDefinitions {
  term: string;
  roman: string;
  defs: Definition[];
}

export interface idGet {
  offset: number;
}

export interface Search {
  query: string;
}

export interface GetUser {
  userId: number;
}

export interface SignUpUser {
  username: string;
  password: string;
  email: string;
}

export interface SignInUser {
  email: string;
  password: string;
}

export interface UpdateUser {
  userId: number;
  username: string;
  password: string;
}

export interface DeleteUser {
  userId: number;
}

export interface CheckUsedUser {
  username?: string,
  email?: string
}