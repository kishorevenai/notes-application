import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUserCredentials } from "../../Pages/Login/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500",
  // credentials: "omit",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("sending refresh token");

    const refreshToken = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshToken?.data) {
      api.dispatch(
        setUserCredentials({
          ...refreshToken.data,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshToken?.error?.status === 403) {
        refreshToken.error.data.message =
          "Your login is expired, Please Login again";
      }
      return refreshToken;
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: "ParentAPI",
  tagTypes: ["Note"],
  endpoints: (builder) => ({}),
});
