import mongoose from "mongoose";
import dashboardevoSchema from "./../schema/users";

const dashboardevoModel = mongoose.model("users", dashboardevoSchema);

export default dashboardevoModel;
