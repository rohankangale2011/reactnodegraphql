import express from 'express';
import rootSchema from './schema';
import graphqlHTTP from 'express-graphql';
const port = 3005;
const app = express();

app.use('/graphql', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,  Authorization, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use('/graphql', graphqlHTTP({
    schema: rootSchema,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`\n Server listening at http://localhost:${port} \n`);
});