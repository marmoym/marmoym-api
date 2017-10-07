export namespace TermRequest {
  // {
  //    "offset": "5"
  // }
  export interface Get {
    offset: number;
  }
}

export namespace DefinitionRequest {
  interface Definition {
    label: string;
    posIds: number[];
    usages: string[];
    extResources: string[];
    origins: string[]; 
  }

  // {
  //   "term": "실화니",
  //   "roman": "sirhoani",
  //   "defs": [{
  //     "label": "진짜야라고 묻는 말이다.",
  //     "posIds": [ 
  //       1, 
  //       3 
  //     ],
  //     "usages": [
  //       "철수 얼굴 실화니", 
  //       "철수 자동차 실화니"
  //     ],
  //     "extResources": [
  //       "https://youtube.com"
  //     ],
  //     "origins": [
  //       "아프리카방송에서 유래되었다."
  //     ]
  //   }, {
  //     "label": "진짜야라고 묻는 말이다.",
  //     "posIds": [ 
  //       1, 
  //       3 
  //     ],
  //     "usages": [
  //       "철수 얼굴 실화니", 
  //       "철수 자동차 실화니"
  //     ],
  //     "extResources": [
  //       "https://youtube.com"
  //     ],
  //     "origins": [
  //       "아프리카방송에서 유래되었다."
  //     ]
  //   }]
  // }
  export interface Add {
    term: string;
    roman: string;
    defs: Definition[];
  }
}

export namespace UserRequest {

  // {
  //   "userId": "1"
  // }
  export interface Get {
    userId: number;
  }

  // {
  //   "username": "gimochi",
  //   "password": "123qwe",
  //   "email": "test@test.com"
  // }
  export interface SignUp {
    username: string;
    password: string;
    email: string;
  }

  // {
  //   "email": "test@test.com"
  //   "password": "123qwe",
  // }
  export interface SignIn {
    email: string;
    password: string;
  }

  // {
  //   "userId": "1",
  //   "username": "gimochi",
  //   "password": "123qwe"
  // }
  export interface Update {
    userId: number;
    username: string;
    password: string;
  }

  // {
  //   "userId": "1",
  // }
  export interface Delete {
    userId: number;
  }

  // {
  //   "username": "gimochi",
  //   "email": "123qwe"
  // }
  export interface CheckUsed {
    username?: string,
    email?: string
  }
} 