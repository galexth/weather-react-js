import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import moment from "moment";

const API_KEY = "f043da3d7e17dec5f8f361091ebc0f59";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/2.5",
  }),
  keepUnusedDataFor: 100,
  endpoints(builder) {
    return {
      fetchData: builder.query({
        query({ city, ts }) {
          const isCurrent = moment(ts).isSameOrAfter(new Date(), "day");

          return {
            url: isCurrent ? "/onecall" : "/onecall/timemachine",
            params: {
              lat: city.lat,
              lon: city.lon,
              appid: API_KEY,
              units: "metric",
              dt: moment(ts).unix(),
            },
          };
        },
        transformResponse: (response, meta, { ts }) => {
          const requestDate = moment(ts);
          let temp = response.current.temp;

          if (response.daily) {
            const weather = response.daily.find(({ dt }) =>
              requestDate.isSame(moment.unix(dt), "day")
            );

            if (!weather) {
              throw new Error("Only 1 week lookahead is allowed");
            }

            temp = weather.temp.day;
          }

          return {
            temp: Math.floor(temp),
            title: response.current.weather[0].main,
            description: response.current.weather[0].description,
            icon: response.current.weather[0].icon,
          };
        },
      }),
    };
  },
});

export const { useFetchDataQuery } = apiSlice;
