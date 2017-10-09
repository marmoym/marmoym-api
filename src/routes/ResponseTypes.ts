interface Term {
  id: number;
  label: string;
  roman: string;
}

interface Definition {
  id: number;
  label: string;
  termId: number;
  username: string;
  poss: string[];
  usages: string[];
  origins: string[];
  vote: {
    upvote: number;
    downvote: number;
  }
  createdAt: number;
  updatedAt: number;
}

interface User {
  id: number;
  username: string;
}

interface DefinitionAbstract {
  id: number;
  updatedAt: number;
}

export namespace DefinitionResponse {
  export interface idGet {
    defIds: DefinitionAbstract[];
  }

  export interface Get {
    terms: Term[];
    definitions: Definition[];
    users: User[];
  }
}