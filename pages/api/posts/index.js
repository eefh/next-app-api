import clientPromise from "../../../lib/mongodb"

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db('zerlog');
    switch(req.method){
        case "POST":
            let body = req.body;
            let post = await db.collection(req.body.category.id).insertOne({ body });
            res.status(201).json(post[0]);
            break;
        case "GET":
            const posts = await db.collection('posts').find({}).toArray();
            res.status(200).json({posts});
            break;
    }
}
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb' // Set desired value here
        }
    }
}
