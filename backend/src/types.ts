export type Note = {
  id?: Number;
  title: string;
  body: string;
  tags: string[];
};

export type User = {
  id: string | Number;
  name: string;
  email: string;
  password: string;
  notes: Note[];
};

export type SignUp = {
  name: string;
  email: string;
  password: string;
};

export type Login = {
  email: string;
  password: string;
};
