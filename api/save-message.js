
import clientPromise from '../lib/mongodb';

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    try {
        const { message } = req.body;

        if (!message) {
            res.status(400).json({ message: 'Message is required' });
            return;
        }

        const client = await clientPromise;
        const db = client.db('valentine');
        const collection = db.collection('messages');

        const result = await collection.insertOne({
            message,
            createdAt: new Date(),
        });

        res.status(201).json({ message: 'Message saved!', result });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
