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
  }

  export async function poll(): Promise<void> {

  }

  export function getSessionState(): Readonly<ISessionInfo> {
    return sessionInfo;
  }
}