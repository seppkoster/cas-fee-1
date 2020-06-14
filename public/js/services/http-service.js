class HttpService {
  async read(url) {
    const headers = new Headers({ "content-type": "application/json" });
    const response = await fetch(url, { headers, method: "GET" });
    return response.json();
  }

  async create(url, resource) {
    const headers = new Headers({ "content-type": "application/json" });
    const response = await fetch(url, {
      headers,
      method: "POST",
      body: JSON.stringify(resource),
    });
    return response.json();
  }
}

export const httpService = new HttpService();
