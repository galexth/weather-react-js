import Image from "next/image";

export default function Weather(props) {
  const { temp, icon, title, description } = props.day;

  return (
    <div className="columns-2 max-w-sm">
      <div>
        <Image
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          width={100}
          height={100}
        />
      </div>
      <div>
        <div className="text-2xl">{temp} &#8451;</div>
        <div className="text-xl">{title}</div>
        <div className="text-sm">{description}</div>
      </div>
    </div>
  );
}
