import mongoose from "mongoose";

export const dbConnection =  () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "JobPortal",
    }).then(() => {
        console.log("Database connected");
    }).catch((err) => {
        console.log(`error occured while connecting to database:${err}`);
    });
};