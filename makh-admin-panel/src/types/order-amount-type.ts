import { IProduct } from "./product-type";

// user 
interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  imageURL?: string;
  role: string;
  status: string;
  reviews?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  _id: string;
  user:IUser;
  cart: IProduct[];
  name: string;
  address: string;
  email: string;
  contact: string;
  city: string;
  country: string;
  zipCode: string;
  subTotal: number;
  shippingCost: number;
  discount?: number;
  totalAmount: number;
  shippingOption: string;
  paymentMethod: string;
  orderNote?: string;
  invoice: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}


export interface IOrderAmounts {
  todayOrderAmount: number;
  yesterdayOrderAmount: number;
  monthlyOrderAmount: number;
  totalOrderAmount: number;
  todayCardPaymentAmount: number;
  todayCashPaymentAmount: number;
  yesterDayCardPaymentAmount: number;
  yesterDayCashPaymentAmount: number;
}



export interface ISalesEntry {
  date: string;
  total: number;
  order: number;
}

export interface ISalesReport {
  salesReport: ISalesEntry[];
}


export interface IMostSellingCategory {
  categoryData: {
    _id: string;
    count: number;
  }[];
}

// I Dashboard Recent Orders
export interface IOrder {
  _id: string;
  user: string;
  name: string;
  totalAmount: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  invoice: number;
}

export interface IDashboardRecentOrders {
  orders: IOrder[];
  totalOrder: number;
}

// get all orders type 
export interface IGetAllOrdersRes {
  success: boolean;
  data: Order[];
}
// get all orders type 
export interface IUpdateStatusOrderRes {
  success: boolean;
  message: string;
}
