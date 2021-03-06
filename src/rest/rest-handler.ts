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

export interface IRating {
  answerId: string;
  rating: -1 | 1;
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
    try {
      const response = (await axios.get(`http://${baseUrl}/coursesession/enter/${code}`)).data;
      const token = response.token;
      if (!token) return false;
      sessionToken = token;
      return true;
    } catch (e) {
      return false;
    }
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

  export async function postAnswer(content: string): Promise<boolean> {
    if (sessionInfo.status !== 'QUESTION') throw new Error('Tried sending an answer when status was not QUESTION.');
    try {
      const response = (await axios.post(`http://${baseUrl}/coursesession/answer`, {data:{
        token: sessionToken,
        questionId: sessionInfo.question?.id,
        answer: content
      }})).data;
      return true;
    } catch (e) {
      console.log(JSON.stringify(e));
      return false;
    } finally {
    }
  }

  export async function postRatings(ratings: IRating[]): Promise<boolean> {
    if (sessionInfo.status !== 'RATE') throw new Error('Tried sending ratings when status was not RATE.');
    try {
      const response = (await axios.post(`http://${baseUrl}/coursesession/rate`, {data:{
        token: sessionToken,
        ratings
      }})).data;
      return true;
    } catch (e) {
      console.log(JSON.stringify(e));
      return false;
    } finally {
    }
  }
}