
import express from "express";
import getEmbeddings from "./Services/openAi-embedding-service.js";
import { MongoDBMoviesService } from "./Services/mongodb-movies-service.js";
import cors from "cors";

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173"
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});


app.post("/embeddings", async (request, response) => {
  const searchQuery = request.body.searchQuery;
  const embeddings = await getEmbeddings(searchQuery);
  response.send(embeddings);    
 });

app.post ("/moviesByFuzzySearch", async (request, response) => {
    const searchQuery = request.body.searchQuery;
    const embeddings = await getEmbeddings(searchQuery);
    const movies = await new MongoDBMoviesService().getMoviesByFuzzySearch(embeddings);
    console.log(movies);
       response.send(movies);
    });



app.get("/movies", (request, response) => {
    const movies = [
      {
        plot: 'A drama following stories of characters from the Portuguese High Society.',
        genres: [ 'Musical', 'Drama', 'Fantasy' ],
        title: 'Os Canibais',
        year: 1988,
        score: 0.909759521484375
      },
      {
        plot: 'An American attorney on business in China, ends up wrongfully on trial for murder and his only key to innocence is a female defense lawyer from the country.',
        genres: [ 'Action', 'Crime', 'Drama' ],
        poster: 'https://m.media-amazon.com/images/M/MV5BMzE0MjU5NzQxNV5BMl5BanBnXkFtZTcwMzQzNzU2NA@@._V1_SY1000_SX677_AL_.jpg',
        title: 'Red Corner',
        year: 1997,
        score: 0.904083251953125
      },
      {
        year: 1998,
        plot: 'In a desperate attempt to prove his innocence, a skilled police negotiator accused of corruption and murder takes hostages in a government office to gain the time he needs to find the truth.',
        genres: [ 'Action', 'Crime', 'Drama' ],
        title: 'The Negotiator',
        poster: 'https://m.media-amazon.com/images/M/MV5BOGE1YTI2NjItNDAyYy00YzI3LTlmNDUtYWU0ZmFlNWE3N2ViL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SY1000_SX677_AL_.jpg',
        score: 0.9037322998046875
      },
      {
        plot: 'A man and woman from feuding families each pretend to fall in love, as part of a revenge plot. Chaos ensues when their fake romance becomes a reality.',
        genres: [ 'Action', 'Comedy', 'Drama' ],
        poster: 'https://m.media-amazon.com/images/M/MV5BNzU2ZTBlZmYtN2VhNC00ZDRjLWE4ZjgtYTEyMGIwYTMyN2I4XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SY1000_SX677_AL_.jpg',
        title: 'Hulchul',
        year: 2004,
        score: 0.903717041015625
      },
      {
        plot: 'A drama about the fate of brothers forced to fight in the Korean War.',
        genres: [ 'Action', 'Drama', 'War' ],
        poster: 'https://m.media-amazon.com/images/M/MV5BNjAxZTEzNzQtYjdlNy00ZTJmLTkwZDUtOTAwNTM3YjI2MWUyL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SY1000_SX677_AL_.jpg',
        title: 'Tae Guk Gi: The Brotherhood of War',
        year: 2004,
        score: 0.9024200439453125
      },
      {
        year: 2010,
        plot: 'A drama based on the experiences of Kathryn Bolkovac, a Nebraska cop who served as a peacekeeper in post-war Bosnia and outed the U.N. for covering up a sex scandal.',
        genres: [ 'Action', 'Biography', 'Crime' ],
        title: 'The Whistleblower',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTkwNzU4MDk1OF5BMl5BanBnXkFtZTcwMjIyMjg4NQ@@._V1_SY1000_SX677_AL_.jpg',
        score: 0.90191650390625
      },
      {
        plot: 'A hilarious cat and mouse chase and mind game between two highly intelligent young men, who stands on the two sides of law and order.',
        genres: [ 'Action', 'Comedy', 'Drama' ],
        title: 'Julayi',
        year: 2012,
        score: 0.9018707275390625
      },
      {
        plot: "A fireman takes an unexpected course of action when a man whom he's been ordered to testify against, after being held up at a local convenience store, threatens him.",
        genres: [ 'Action', 'Crime', 'Drama' ],
        poster: 'https://m.media-amazon.com/images/M/MV5BMTAyOTc4OTg2MzJeQTJeQWpwZ15BbWU3MDk0NzgyNzg@._V1_SY1000_SX677_AL_.jpg',
        title: 'Fire with Fire',
        year: 2012,
        score: 0.900634765625
      },
      {
        year: 2010,
        plot: 'A drama centered on three people -- a blue-collar American, a French journalist and a London school boy -- who are touched by death in different ways.',
        genres: [ 'Drama', 'Fantasy' ],
        title: 'Hereafter',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjE2MzU3Nzk4M15BMl5BanBnXkFtZTcwODcxNTI5Mw@@._V1_SY1000_SX677_AL_.jpg',
        score: 0.9006195068359375
      },
      {
        plot: 'Upon discovering a den of corrupt policemen, a fresh-faced journalist makes a shaky allies in a jaded reporter and investigator for a powerful district attorney.',
        genres: [ 'Action', 'Crime', 'Drama' ],
        poster: 'https://m.media-amazon.com/images/M/MV5BYWM1YjRiZWQtNDFmYi00N2U0LWI1NzgtMTBmY2MwMWE1OTZhXkEyXkFqcGdeQXVyNDgyODgxNjE@._V1_SY1000_SX677_AL_.jpg',
        title: 'Edison',
        year: 2005,
        score: 0.9003448486328125
      }
    ];
    
    
    response.send(movies);
 } );

app.get("/movies/:id", (request, response) => {
    const movies = [
       {
          "id": 1,
          "title": "Inception",
          "director": "Christopher Nolan"
       },
       {
          "id": 2,
          "title": "Interstellar",
          "director": "Christopher Nolan"
       },
       {
          "id": 3,
          "title": "The Dark Knight",
          "director": "Christopher Nolan"
       }
    ];
    
    const movie = movies.find(movie => movie.id === parseInt(request.params.id));
    
    if (!movie) {
       response.status(404).send("Movie not found");
    }
    
    response.send(movie);
 });
