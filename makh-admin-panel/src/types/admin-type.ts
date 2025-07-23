
// admin add
export interface IAdminRegisterAdd {
  name: string;
  email: string;
  password: string;
}

// admin add
export interface IAdminLoginAdd {
  email: string,
  password: string,
}

export interface IAdminLoginRes {
  _id: string;
  token: string;
  name: string;
  image?: string;
  email: string;
  phone?: string;
  role?: string;
}

// Admin RegisterRes
export interface IAdminRegisterRes {
  token: string;
  _id: string;
  name: string;
  email: string;
  role: string;
  joiningData: string;
}

export interface IAdminUpdate {
  name?: string;
  image?: string;
  email?: string;
  phone?: string;
  role?: string;
  joiningData?: string;
}

export interface IAdminUpdateRes {
  token: string;
  _id: string;
  name: string;
  image: string;
  email: string;
  phone: string;
  role: string;
}

export interface IAddStuff {
  name: string;
  email: string;
  password?: string;
  image?: string;
  role?: string;
  phone?: string;
  joiningDate?: string;
}
// single stuff
export interface IStuff {
  _id:string;
  name: string;
  image?: string;
  address?: string;
  country?: string;
  city?: string;
  email: string;
  phone?: string;
  status?: "Active" | "Inactive";
  password?: string;
  role: "Admin" | "Super Admin" | "Manager" | "CEO";
  joiningDate?: string;
  createdAt: string;
  updatedAt: string;
}
// IAdminGetRes
export interface IAdminGetRes {
  status: boolean;
  message: string;
  data: IStuff[]
}
