import axios from "axios";
import * as appConfig from '../appConfig.json';

export type sessionState = 'IDLE' | 'QUESTION' | 'RATE' | 'FINISH';

export interface IContent {
  content: string;
  id: string
}

export interface ISessionInfo {
  status: sessionState;
  question?: IContent;
  answers?: IContent[];
}

export namespace RestHandler {
  const baseUrl = appConfig.serverIp;
  let sessionToken: string | undefined = undefined;

  const sessionInfo: ISessionInfo = {
    status: 'IDLE',
    question: undefined,
    answers: undefined
  }

  export async function startSession(code: string): Promise<boolean> {
    const response = (await axios.get(`http://${baseUrl}/coursesession/enter/${code}`)).data;
    const token = response.token;
    if (!token) return false;
    sessionToken = token;
    return true;
  }

  export async function poll(): Promise<boolean> {
    if (!sessionToken) return false;
    try {
      const response = (await axios.get(`http://${baseUrl}/coursesession/status/${sessionToken}`)).data;
      sessionInfo.status = response.status;
      sessionInfo.answers = response.answers;
      sessionInfo.question = response.question;
      return true;
    } catch (e) {
      console.log(JSON.stringify(e));
      return false;
    }
  }

  export function getSessionState(): Readonly<ISessionInfo> {
    return sessionInfo;
  }
}