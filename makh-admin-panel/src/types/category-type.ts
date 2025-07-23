
export interface ICategoryItem {
  _id: string;
  img: string;
  parent: string;
  children: string[];
  productType: string;
  products?: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse {
  success: boolean;
  result: ICategoryItem[];
}

export interface IAddCategory {
  img?: string;
  parent: string;
  children: string[];
  description?: string;
}

export interface CategoryRes {
  _id: string;
  img?: string;
  description?: string;
  parent: string;
  children: string[];
  products?: any[];
  createdAt: string;
  updatedAt: string;
}

export interface IAddCategoryResponse {
  status: string;
  message: string;
  data: CategoryRes;
}

export interface ICategoryDeleteRes {
  success?: boolean;
  message?: string;
}


