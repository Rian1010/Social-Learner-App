import axios from 'axios';

export interface getNewUser {
  name?: string;
  email: string;
  password: string;
}

export interface IPayload {
  exp: number;
  iat: number;
  user: {
    avatar: string;
    name: string;
    email: string;
    date: Date;
    id: string;
  };
}

export interface IProfile {
  user: string;
  company: string;
  status: string;
  skills: string;
}

export interface IFullPayload {
  exp: number;
  iat: number;
  user: {
    avatar: string;
    name: string;
    email: string;
    date: Date;
    id: string;
  };
  profile: {
    _id: string;
    user: string;
    company: string;
    skills: Array<object>;
    status: string;
    experience: Array<object>;
    education: Array<object>;
    date: Date;
  };
  post: {
    user: string;
    name: string;
    text: string;
    avatar: string;
    likes: Array<object>;
    comments: Array<object>;
    date: Date;
  };
}
