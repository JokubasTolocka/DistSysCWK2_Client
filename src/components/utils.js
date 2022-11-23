const URI = "https://en.wikipedia.org/w/api.php";

const getParams = (title) => ({
  action: "query",
  prop: "pageimages",
  titles: title,
  format: "json",
});

export const fetchImage = async (title) => {
  // construct the url
  let url = URI + "?origin=*";

  // get params request
  const params = getParams(title);

  // contruct a query from params
  Object.keys(params).forEach(function (key) {
    url += "&" + key + "=" + params[key];
  });

  // make fetch function
  const imageSrc = await fetch(url)
    .then(function (response) {
      // get json of the response
      return response.json();
    })
    .then(function (response) {
      // destruct object to get pages
      var pages = response.query.pages;
      // get first key value
      const object = pages[Object.keys(pages)[0]];

      // get image url
      const image = object.thumbnail.source;

      // return image url
      return image;
    })
    .catch(function (error) {
      // if error, show error in console
      console.log(error);
    });

  return imageSrc;
};
