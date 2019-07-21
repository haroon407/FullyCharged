import AddLocation from "views/AddLocation";
import EditLocation from "views/EditLocation";
import MakeBooking from "views/MakeBooking";
import Analytics from "views/Analytics";
import Website from "views/Website";
import SignIn from "views/SignIn";
import EVORegister from "views/EVORegister";
import EVCPRegister from "views/EVCPRegister";
import DashboardEVO from "views/DashboardEVO";

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
        path: "/dasboard-evo",
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
        path: "/make_booking",
        name: "Make Booking",
        icon: "pe-7s-plus",
        component: MakeBooking,
        layout: "/admin"
    },
    {
        path: "/analytics",
        name: "Analytics",
        icon: "pe-7s-plus",
        component: Analytics,
        layout: "/admin"
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
