export class RequestHandler {
  constructor(baseURL, resource) {
    this.baseURL = baseURL;
    this.resource = resource;
  }

  _applyFilters = function (filters) {
    let result = "";

    Object.keys(filters).forEach((key) => {
      result += `&${key}=${filters[key]}`;
    });

    return result;
  };

  _applyData = function (pageId, filters) {
    if (filters == undefined) {
      return `${this.baseURL}/${this.resource}/?page=${pageId}`;
    }

    return `${this.baseURL}/${
      this.resource
    }/?page=${pageId}${this._applyFilters(filters)}`;
  };

  getFromPage = async function (pageId, filters) {
    return this.getDataDirect(this._applyData(pageId, filters));
  };

  getDataDirect = async function (url) {
    return fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(response.status);
        }

        return Promise.resolve(response);
      })
      .then(function (response) {
        return response.json();
      });
  };
}
