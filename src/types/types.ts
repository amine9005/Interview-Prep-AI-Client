export interface UserProfile {
  _id: string;
  username: string;
  email: string;
  profileImageURL: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Session {
  _id: string;
  user: string;
  role: string;
  experience: string;
  topicToFocus: string;
  description: string;
  questions: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Question {
  _id: string;
  session: string;
  question: string;
  answer: string;
  note: string;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
