import AddLocation from "views/AddLocation";
import EditLocation from "views/EditLocation";
import MakeBooking from "views/MakeBooking";
import Analytics from "views/Analytics";
import Website from "views/Website";

const dashboardRoutes = [
    {
        path: "/",
        name: "Landing Page",
        icon: "pe-7s-graph",
        component: Website,
        layout: "/index",
        noSideNav: true
    },
    {
        path: "/add/location",
        name: "Add Location",
        icon: "pe-7s-plus",
        component: AddLocation,
        layout: "/admin"
    },
    {
        path: "/edit/location",
        name: "Edit Location",
        icon: "pe-7s-pen",
        component: EditLocation,
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
        path: "/update/location",
        name: "Edit Location",
        icon: "pe-7s-plus",
        component: AddLocation,
        layout: "/admin",
        noSideNav: true
    }
];

export default dashboardRoutes;
