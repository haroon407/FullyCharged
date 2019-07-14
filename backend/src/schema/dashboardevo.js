import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import autoIncrement from "mongoose-auto-increment";

const dashboardSchema = new mongoose.Schema({
  name: {
    type: String
  },
  role: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    index: true,
    unique: true,
    required: true
  }
});

usersSchema.plugin(uniqueValidator);
usersSchema.plugin(autoIncrement.plugin, "id");

export default dashboardSchema;
