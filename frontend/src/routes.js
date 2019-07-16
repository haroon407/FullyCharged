import Dashboard from "views/Dashboard.jsx";
import AddLocation from "views/AddLocation";
import MakeBooking from "views/MakeBooking";
import Analytics from "views/Analytics";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Website from "views/Website";

const dashboardRoutes = [
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
        path: "/add/location",
        name: "Add Location",
        icon: "pe-7s-plus",
        component: AddLocation,
        layout: "/admin"
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
