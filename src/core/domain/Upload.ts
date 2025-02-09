export enum CATEGORIES {
  LANCHE = 'LANCHE',
  ACOMPANHAMENTO = 'ACOMPANHAMENTO',
  BEBIDA = 'BEBIDA',
  SOBREMESA = 'SOBREMESA',
}

export interface IUpload {
  id: number;
  name: string;
  data: any;
  // description: string;
  // price: number;
  // category: CATEGORIES;
}
