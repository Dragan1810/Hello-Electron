import PouchDB from "pouchdb-browser";

const db = { series: new PouchDB("series") };

export default db;
