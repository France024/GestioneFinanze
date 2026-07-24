import {
  LayoutDashboard,
  ArrowLeftRight,
  PieChart,
  Target,
  Tags,
  Repeat2,
  Wallet,
  Settings,
} from "lucide-react";

export const NAV_ITEMS = [
  { id: "home", path: "/", label: "Home", icon: LayoutDashboard, num: "01" },
  { id: "movimenti", path: "/movimenti", label: "Movimenti", icon: ArrowLeftRight, num: "02" },
  { id: "resoconto", path: "/resoconto", label: "Resoconto", icon: PieChart, num: "03" },
  { id: "obiettivi", path: "/obiettivi", label: "Obiettivi", icon: Target, num: "04" },
  { id: "categorie", path: "/categorie", label: "Categorie", icon: Tags, num: "05" },
  { id: "ricorrenze", path: "/ricorrenze", label: "Ricorrenze", icon: Repeat2, num: "06" },
  { id: "portafogli", path: "/portafogli", label: "Portafogli", icon: Wallet, num: "07" },
];
