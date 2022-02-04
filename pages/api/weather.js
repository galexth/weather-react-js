import axios from "axios";
import moment from "moment";
import { apiConfig } from "config";

export default async function handler(req, res) {
  const { lat, lon, ts } = req.query;
  let url = "";

  const params = {
    params: {
      lat,
      lon,
      appid: apiConfig.appid,
      units: apiConfig.units,
    },
  };

  if (moment.unix(ts).isSameOrAfter(new Date(), "day")) {
    params.params.exclude = ["minutely", "hourly", "alerts"].join(",");
  } else {
    url = "/timemachine";
    params.params.dt = ts;
  }

  try {
    const { data } = await axios.get(apiConfig.baseUri + url, params);

    const requestDate = moment.unix(ts);
    let temp = data.current.temp;

    if (data.daily) {
      const weather = data.daily.find(({ dt }) =>
        requestDate.isSame(moment.unix(dt), "day")
      );

      if (!weather) {
        return res
          .status(400)
          .json({ message: "Only 1 week lookahead is allowed" });
      }

      temp = weather.temp.day;
    }

    return res.json({
      temp: Math.floor(temp),
      title: data.current.weather[0].main,
      description: data.current.weather[0].description,
      icon: data.current.weather[0].icon,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.response?.data?.message || "Something went wrong.",
    });
  }
}
