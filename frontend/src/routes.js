import AddLocation from "views/AddLocation";
import EditLocation from "views/EditLocation";
import Website from "views/Website";
import SignIn from "views/SignIn";
import EVORegister from "views/EVORegister";
import EVCPRegister from "views/EVCPRegister";
import DashboardEVO from "views/DashboardEVO";
import Analytics from "views/Analytics";
import MakeBooking from "views/MakeBooking";
import FindChargers from "views/FindChargers.jsx";

const dashboardRoutes = [
  {
    path: "/sign-in",
    name: "Sign In",
    icon: "pe-7s-graph",
    component: SignIn,
    layout: "/index",
    noSideNav: true
  },
  {
    path: "/analytics",
    name: "Analytics",
    icon: "pe-7s-graph1",
    component: Analytics,
    layout: "/admin",
    role: "EVCP"
  },
  {
    path: "/make_booking",
    name: "Make Booking",
    icon: "pe-7s-plus",
    component: MakeBooking,
    layout: "/admin",
    noSideNav: true,
    role: "EVO"
  },
  {
    path: "/find_chargers",
    name: "Find Chargers",
    icon: "pe-7s-map",
    component: FindChargers,
    layout: "/admin",
    role: "EVO"
  },
  {
    path: "/evo-register",
    name: "EVO Registration",
    icon: "pe-7s-graph",
    component: EVORegister,
    layout: "/index",
    noSideNav: true
  },
  {
    path: "/evcp-register",
    name: "EVCP Registration",
    icon: "pe-7s-graph",
    component: EVCPRegister,
    layout: "/index",
    noSideNav: true
  },
  {
    path: "/",
    name: "Landing Page",
    icon: "pe-7s-graph",
    component: Website,
    layout: "/index",
    noSideNav: true
  },
  {
    path: "/dashboard-evo",
    name: "Dashboard EVO",
    icon: "pe-7s-graph",
    component: DashboardEVO,
    layout: "/admin",
    role: "EVO"
  },
  {
    path: "/add/location",
    name: "Add Location",
    icon: "pe-7s-plus",
    component: AddLocation,
    layout: "/admin",
    role: "EVCP"
  },
  {
    path: "/edit/location",
    name: "Edit Location",
    icon: "pe-7s-pen",
    component: EditLocation,
    layout: "/admin",
    role: "EVCP"
  },
  {
    path: "/update/location",
    name: "Edit Location",
    icon: "pe-7s-plus",
    component: AddLocation,
    layout: "/admin",
    noSideNav: true
  }
];

export default dashboardRoutes;
