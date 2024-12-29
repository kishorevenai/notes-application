import { apiSlice } from "../../app/api/apiSlice";
import { setUserCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => {
        return {
          url: "/login",
          method: "POST",
          body: {
            ...credentials,
          },
        };
      },
    }),
    signup: builder.mutation({
      query: (credentials) => {
        return {
          url: "/author/sign-up",
          method: "POST",
          body: {
            ...credentials,
          },
        };
      },
    }),
    refresh: builder.mutation({
      query: () => {
        return {
          url: "/auth/refresh",
          method: "GET",
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("=============>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data);
          const { accessToken } = data;
          dispatch(setUserCredentials({ accessToken }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useRefreshMutation } =
  authApiSlice;
