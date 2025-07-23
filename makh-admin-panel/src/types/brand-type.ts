

export interface Brand {
  _id: string;
  name: string;
  email?: string;
  logo?: string;
  website?: string;
  location?: string;
  description?: string;
}

export interface BrandResponse {
  success: boolean;
  result: Brand[];
}

export interface BrandDelResponse {
  success: boolean;
  message: string;
}

export interface IAddBrand {
  name: string;
  email: string;
  logo?: string;
  website?: string;
  location?: string;
  description?: string;
  status?:string;
}

export interface IBrandAddResponse {
  success: boolean;
  message: string;
  data:Brand
}

