import { Client } from "graphql-ld";
import { QueryEngineComunica } from "graphql-ld-comunica";
import { writeFile } from 'fs';

const context = {
  "@context": {
      "label": "http://www.w3.org/2000/01/rdf-schema#label",
      "label_en": {
          "@id": "http://www.w3.org/2000/01/rdf-schema#label",
          "@language": "en"
      },
      "writer": "http://dbpedia.org/ontology/writer",
      "artist": "http://dbpedia.org/ontology/musicalArtist"
  }
};

// Find all labels in a dataset
const query = `{
  label @single
  writer(label_en: "Dan Bittman")  @single
  artist  @single(scope: all) {
    label
  }
}`;

// Create a GraphQL-LD client based on a client-side Comunica engine over 2 sources
const comunicaConfig = {
  sources: ["https://dbpedia.org/sparql", "https://ruben.verborgh.org/profile/"],
};
const client = new Client({ context, queryEngine: new QueryEngineComunica(comunicaConfig) });



// Execute the query
const { data } = await client.query({ query });

// console.log(data)


writeFile('./results/writer.json', JSON.stringify(data), function (err) {
  if (err) {
    console.log('There has been an error saving your configuration data.');
    console.log(err.message);
    return;
  }
  console.log('Result saved successfully.')
});


