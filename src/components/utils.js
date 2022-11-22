const URI = "https://en.wikipedia.org/w/api.php";

const getParams = (title) => ({
  action: "query",
  prop: "pageimages",
  titles: title,
  format: "json",
});

export const fetchImage = async (title) => {
  let url = URI + "?origin=*";

  const params = getParams(title);

  Object.keys(params).forEach(function (key) {
    url += "&" + key + "=" + params[key];
  });

  const imageSrc = await fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      var pages = response.query.pages;
      const object = pages[Object.keys(pages)[0]];

      const image = object.thumbnail.source;

      return image;
    })
    .catch(function (error) {
      console.log(error);
    });

  return imageSrc;
};
