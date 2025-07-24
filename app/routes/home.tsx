import type { Route } from "./+types/home";
import Navbar from '../Components/Navbar';
import {callback} from 'fdir/dist/api/async';
import ResumeCard from "../Components/ResumeCard";



export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
