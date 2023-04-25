import { fetchApi, fetchAPI } from "./utils/api.js";

// fetchAPI('https://rickandmortyapi.com/api/character');

fetchApi('https://rickandmortyapi.com/api/character')
     .then(data => console.log(data));