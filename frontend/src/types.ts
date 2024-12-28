export type Addnote = {
  id: string;
  title: string;
  body: string;
  tags: string[];
};

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
