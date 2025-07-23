import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// user type
type IUser = {
  _id: string;
  name: string;
  email: string;
  role?: string | undefined;
  image?: string | undefined;
  phone?: string | undefined;
};
type IAuth = {
  accessToken: string;
  user: IUser;
};

// Check if the cookie exists
const cookieData = Cookies.get("admin");
let initialAuthState: {
  accessToken: string | undefined;
  user: IUser | undefined;
} = {
  accessToken: undefined,
  user: undefined,
};

// If the cookie exists, parse its value and set it as the initial state
if (cookieData) {
  try {
    const parsedData: { accessToken: string; user: IUser } = JSON.parse(cookieData);
    initialAuthState = {
      accessToken: parsedData.accessToken,
      user: parsedData.user,
    };
  } catch (error) {
    console.error("Error parsing cookie data:", error);
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState:initialAuthState,
  reducers: {
    userLoggedIn: (state, { payload }: { payload: IAuth }) => {
      state.accessToken = payload.accessToken;
      state.user = payload.user;
      Cookies.set("admin",JSON.stringify({
          accessToken: payload.accessToken,
          user: payload.user
        }),
        { expires: 0.5 }
      );
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
      Cookies.remove("admin");
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
