const compilerUrl = 'https://chakra-net.herokuapp.com/compile';
// const compilerUrl = 'https://localhost:5001/compile';

const runCsharp = async (code) => {
  const requestBody = {
    snippet: code.split("\n")
  }

  const response = await fetch(compilerUrl, {
    method: 'PUT',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'omit', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    // redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'unsafe-url', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(requestBody)
  });

  return response.json()
};

export default runCsharp;
