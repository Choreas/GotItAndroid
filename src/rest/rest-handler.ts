import axios from "axios";

export type sessionState = 'IDLE' | 'QUESTION' | 'RATE' | 'FINISH';

export interface IContent {
  content: string;
  id: string
}

export interface ISessionInfo {
  state: sessionState;
  question?: IContent;
  answers?: IContent[];
}

export namespace RestHandler {
  const sessionInfo: ISessionInfo = {
    state: 'IDLE',
    question: undefined,
    answers: undefined
  }

  export async function poll(): Promise<void> {
    console.log( JSON.stringify((await axios.get('https://gorest.co.in/public-api/users/200')).data) );
  }

  export function getSessionState(): Readonly<ISessionInfo> {
    return sessionInfo;
  }
}