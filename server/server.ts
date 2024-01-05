import express, { Express, Response } from "express";

const geoObjects = require('./geo.objects.mock.json');
const app: Express = express();
const port = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('CityShob App Server');
});

app.get('/api/searchGeoObjects/:type/:txt', ({ params }, res: Response) => {
  res.json(filterGeoObjects(params.type, params.txt));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

function filterGeoObjects(type: string, searchText: string): any[] {
  return geoObjects ?
    geoObjects.filter((geoObj: any) => geoObj.type === parseInt(type) && geoObj.name.toString().toLowerCase().indexOf(searchText) > -1) :
    [];
}
/*
 Remarks:
 1. geoObj here should also have same structure as GeoObjectDto and not use "any". Just for simplicity didn't copy relevant models to server.
 2. I think also that ideally, server should be in a separate repo. For not having 2 repos for you to check, added it to this repo.
 3. I didn't think that this small exercise we need to add db for it. Even this server is maybe too much as it doesn't really do much.
 But if it should be done, I have no problem adding mongodb and selecting from it.. etc.
 */
