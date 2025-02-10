export enum CATEGORIES {
  LANCHE = 'LANCHE',
  ACOMPANHAMENTO = 'ACOMPANHAMENTO',
  BEBIDA = 'BEBIDA',
  SOBREMESA = 'SOBREMESA',
}

export interface IUpload {
  id: number;
  name: string;
  path: string;
  // description: string;
  // price: number;
  // category: CATEGORIES;
}
