import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/weather",
  }),
  keepUnusedDataFor: 100,
  endpoints(builder) {
    return {
      fetchData: builder.query({
        query({ city, ts }) {
          return {
            url: "",
            params: {
              lat: city.lat,
              lon: city.lon,
              ts: ts,
            },
          };
        },
      }),
    };
  },
});

export const { useFetchDataQuery } = apiSlice;
