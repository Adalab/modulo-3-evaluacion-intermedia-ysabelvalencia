const callToApi = () => {
  return fetch('')
    .then((response) => response.json())
    .then((response) => {
      return response;
    });
};

export default callToApi;
