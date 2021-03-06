import Modal from "@components/modal/Modal";
import Tabs from "@components/tabs/Tabs";
import Spinner from "@components/ui/Spinner";
import Weather from "@components/weather/Weather";
import citiesData from "data/cities";
import { useFetchDataQuery } from "features/weather/weather-api-slice";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Home() {
  const [date, setDate] = useState(moment().startOf("day").toDate());
  const [cities, setCities] = useState(citiesData);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { data, error, isFetching } = useFetchDataQuery({
    city: cities.find((i) => i.active),
    ts: moment(date).unix(),
  });

  const handleTabChange = (activeCity) => {
    setCities((prev) =>
      prev.map((item) => ({
        ...item,
        active: item.id === activeCity.id,
      }))
    );
  };

  const handleDayChange = (value) => {
    setDate(value);
  };

  useEffect(() => {
    if (error) {
      setIsOpenModal(true);
    }
  }, [error]);

  return (
    <div className="p-4 md:p-8 max-w-screen-lg">
      {isOpenModal && (
        <Modal
          text={error.data?.message || "Error"}
          onClose={() => setIsOpenModal(false)}
        />
      )}
      <h1 className="text-3xl font-bold">Weather App</h1>
      <Tabs cities={cities} onChange={handleTabChange} />
      <div className="flex flex-nowrap flex-col md:flex-row justify-between items-center md:items-start p-4 md:p-8">
        <div className="h-28">
          {isFetching ? <Spinner size={60} /> : <Weather day={data} />}
        </div>
        <div className="drop-shadow-xl">
          <Calendar
            className={"!border-slate-200"}
            calendarType="ISO 8601"
            value={date}
            onChange={handleDayChange}
            locale={"en-US"}
          />
        </div>
      </div>
    </div>
  );
}
