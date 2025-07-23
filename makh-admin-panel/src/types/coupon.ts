
export interface ICoupon {
  _id: string;
  title: string;
  logo: string;
  couponCode: string;
  endTime: string;
  discountPercentage: number;
  minimumAmount: number;
  productType: string;
  startTime:string;
  createdAt: string;
  updatedAt: string;
  status:string;
}


export interface IAddCoupon {
  title: string;
  logo?: string;
  couponCode: string;
  endTime: string;
  discountPercentage: number;
  minimumAmount: number;
  productType: string;
  startTime?:string;
  status?:string;
}