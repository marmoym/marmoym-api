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
  export interface SignUp {
    username: string;
    password: string;
    email: string;
  }
} 