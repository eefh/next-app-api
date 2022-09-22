import clientPromise from "../../lib/mongodb";

export default async function handler(req, res){
    const client = await clientPromise;
    const db = client.db('zerlog');
    switch(req.method){
        case "POST":
            let body = req.body;
            let post = await db.collection(req.query.id).insertOne({ body });
            res.status(201).json(post[0]);
            break;
        case "GET":
            const posts = await db.collection(req.query.id).find({}).toArray();
            res.status(200).json({posts});
            break;
    }
}