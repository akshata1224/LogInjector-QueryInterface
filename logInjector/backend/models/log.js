import mongoose from "mongoose";
const Schema = mongoose.Schema;

const logSchema = new Schema(
    {
        level:{
            type: String,
        },
        message : {
            type : String,
        },
        resourceId : {
            type: String,
        },
        timestamp : {
            type : String,
        },
        traceId : {
            type : String,
        },
        spanId : {
            type : String,
        },
        commit : {
            type : String,
        },
        metadata : {
                parentResourceId :{
                    type : String
                }
            
        },
    },
    {
        timestamps : true
    }
);


export const Log = mongoose.model('Log', logSchema)