export interface ICategoriesExercises {
  id: string;
  image: string;
  name: string;
  description: string;
  excersises: Excersise[];
}

export interface Excersise {
  id: string;
  image: string;
  name: string;
  sets: number;
}
