import Image from "next/image";
import styles from "./page.module.css";
import Homepage from "./Pages/Homepage/Homepage";
import Header from "@/Components/Header/Header";
import LeftSidebar from "@/Components/LeftSidebar/LeftSidebar";

export default function Home() {
  return (
    <>
      <Homepage/>
      <LeftSidebar/>
      <Header/>
    </>
  );
}
