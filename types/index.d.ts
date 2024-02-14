type Options = string[];

type Questions = {
  question: string;
  answer: string;
  options: Options;
}[];

export type Subject = {
  title: string;
  icon: string;
  bgIconColor: string;
  questions: Questions;
}[];
