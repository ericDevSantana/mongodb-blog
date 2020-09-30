import { connectToDatabase } from "../../utils/mongodb"

export default async function (req, res) {
    const { db } = await connectToDatabase();
    const { post } = req.body;

    const result = await db.collection("posts").insertOne(post);
    
    res.statusCode = 200
    res.json({});
    
}