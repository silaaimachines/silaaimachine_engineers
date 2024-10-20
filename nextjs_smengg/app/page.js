import Image from "next/image";
import SwiperComponent from "./_components/homecomponent/slider";

export default function Home() {
  return (
    <div className=" justify-center items-center">
      <div className="h-1"></div>
      <SwiperComponent/>
      <div className="h-1"></div>
    </div>
  );
}
