import './style.css'
const app = document.getElementById("app");

async function fetchApi() {
  try {
    const response = await fetch(
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20"
    );
    const apiData = await response.json();
    console.log(apiData);
    return apiData;
  } catch (error) {
    console.log(error);
  }
}

fetchApi();


async function afficherDonnée() {
  const reponse = await fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20");
  const data = await reponse.json();
  console.log(data);
}
afficherDonnée();