import express from 'express';
import type { Request, Response } from 'express';

// Initialize an express application
const app = express();

const port = 3000;

// Create a GET HTTP endpoint at index "/"
app.get('/', (req: Request, res: Response) => {
// Return a response string to the client
res.send('Hello World from TypeScript!');

});

// Start the express applixation listening on port 3000
app.listen(port, () => {

console.log(`Example app listening at http://localhost:${port}`)

});