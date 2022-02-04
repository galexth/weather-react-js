import Image from "next/image";

export default function Spinner({ size }) {
  return (
    <div>
      <Image src="/tail-spin.svg" alt="Loading..." width={size} height={size} />
    </div>
  );
}
