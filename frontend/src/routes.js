import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Website from "views/Website";
import SignIn from "views/SignIn";
import SignUp from "views/SignUp";
import DashboardEVO from "views/DashboardEVO";

const dashboardRoutes = [
  {
    path: "/sign-in",
    name: "Sign In",
    icon: "pe-7s-graph",
    component: SignIn,
    layout: "/index"
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    icon: "pe-7s-graph",
    component: SignUp,
    layout: "/index"
  },
  {
    path: "/dasboard-evo",
    name: "Dashboard EVO",
    icon: "pe-7s-graph",
    component: DashboardEVO,
    layout: "/admin"
  },
  {
    path: "/",
    name: "Landing Page",
    icon: "pe-7s-graph",
    component: Website,
    layout: "/index"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    icon: "pe-7s-note2",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "pe-7s-news-paper",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "pe-7s-science",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "pe-7s-map-marker",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications,
    layout: "/admin"
  }
];

export default dashboardRoutes;
