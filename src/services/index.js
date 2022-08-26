const CURRENCE_API = 'https://economia.awesomeapi.com.br/json/all';

async function getCurrenceApi() {
  const response = await fetch(CURRENCE_API);
  const data = await response.json();
  console.log(data);
  return data;
}

export default getCurrenceApi;
