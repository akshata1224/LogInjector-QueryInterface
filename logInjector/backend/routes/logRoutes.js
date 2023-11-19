import express  from "express";
import { Log } from "../models/log.js";

const router = express.Router();

//route to get all books
const  getLogs= async (req, res, query)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try{
        const log = await Log.find(query).skip(skip).limit(limit);
        const totalLogs = await Log.countDocuments();
        const totalPages = Math.ceil(totalLogs / limit);
        return res.status(200).json({
            length : log.length,
            message:log,
            currentPage:page,
            totalItems:totalLogs,
            pages:totalPages
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message:'connot get books'})
    }
}
router.get('/', async(req, res)=> {
    const query = {}
    getLogs(req, res,query)
})

const constructQuery=(query) =>{
    let queryObj={};
    if(query.level){
        queryObj['level']={ $regex: query.level, $options: 'i' };
    }
    if(query.message){
        queryObj['message']={ $regex: query.message, $options: 'i' };
    }
    if(query.resourceId){
        queryObj['resourceId']={ $regex: query.resourceId, $options: 'i' };
    }
    if(query.timestamp){
        queryObj['timestamp']={ $regex: query.timestamp, $options: 'i' };
    }
    if(query.traceId) {
        queryObj['traceId']={ $regex: query.traceId, $options: 'i' };
    }
    if(query.spanId) {
        queryObj['spanId']={ $regex: query.spanId, $options: 'i' };
    }
    if(query.commit) {
        queryObj['commit']={ $regex: query.commit, $options: 'i' };
    }
    // if(query.metadata){
    //     if(query.metadata.parentResourceId){
    //         queryObj['metadata.parentResourceId']=query.metadata.parentResourceId;
    //     }

    // }
    return queryObj

}
//router to search book
router.get('/search',async function(request,response){
    const query  = constructQuery(request.query);
    console.log("inside search")
    console.log(request.query)
    console.log(query)
    getLogs(request, response, query);

});


//save Book
router.post('/', async(request, response)=> {
    try{
        if(
            !request.body
        ){
            console.log(request.body)
            return  response.status(401).json({message: 'connot connect'})
        }
        
        console.log(request.body[0].level);
        for(let i=0;i<request.body.length; i++) {
            var newLog = {
                level : request.body[i].level,
                message : request.body[i].message,
                resourceId: request.body[i].resourceId,
                timestamp: request.body[i].timestamp,
                traceId : request.body[i].traceId,
                spanId : request.body[i].spanId,
                metadata : request.body[i].metadata
            }
            const log = await Log.create(newLog)
            console.log(newLog)
        }
        
        return response.status(201).send({message: "added succesfully"});
    }catch(error){
        console.log('log error')
        //console.log(error)
        response.status(500).send({message: error.message});
    }
})


export default router;