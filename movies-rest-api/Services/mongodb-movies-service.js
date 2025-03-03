import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' });
//9DLvWqzAhsMHbhBu

export class MongoDBMoviesService {
    constructor() {
        this.client = new MongoClient(process.env.MONGODB_URI, { useUnifiedTopology: true });
    }

    async connect() {
        await this.client.connect();
        this.db = this.client.db("sample_mflix");
        this.collection = this.db.collection("embedded_movies");
    }

    async disconnect() {
        await this.client.close();
    }

    async getMoviesByFuzzySearch(vectors) {

        try{

     
        console.log("vectors", vectors);
        
        await this.connect();
        //set up the aggregation pipeline
        const agg = [
            {
              '$vectorSearch': {
                'index': 'vector_index',
                'path': 'plot_embedding',
                'queryVector': vectors,
                'numCandidates': 150,
                'limit': 10
              }
            }, {
              '$project': {
                '_id': 0,
                'plot': 1,
                'title': 1,
                'poster': 1,
                'genres': 1,
                'year': 1,
                'score': {
                  '$meta': 'vectorSearchScore'
                }
              }
            }
          ];
        // run pipeline
        const result = this.collection.aggregate(agg);
        
        return await result.toArray();
        } finally {
            await this.disconnect();
        }
    }

    async getMovies() {
        return this.collection.find({}).toArray();
    }

    async getMovieById(id) {
        return this.collection.findOne({ _id: id });
    }

    async createMovie(movie) {
        return this.collection.insertOne(movie);
    }

    async updateMovie(id, movie) {
        return this.collection.updateOne({ _id: id }, { $set: movie });
    }

    async deleteMovie(id) {
        return this.collection.deleteOne({ _id: id });
    }
}