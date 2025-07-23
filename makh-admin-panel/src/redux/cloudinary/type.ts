export interface ICloudinaryDeleteResponse {
  status: string;
  message: string;
  data: any;
}

export interface ICloudinaryPostResponse {
  status: string;
  message: string;
  data: {url:string,id:string};
}

export interface ICloudinaryMultiplePostRes {
  success: boolean;
  message: string;
  data: {url:string,id:string}[] | [];
}