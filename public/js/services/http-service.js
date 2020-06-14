class HttpService {
  async read(url) {
    const headers = new Headers({ "content-type": "application/json" });
    const response = await fetch(url, { headers, method: "GET" });
    return response.json();
  }

  // ajax(method, url, data, headers) {
  //     const fetchHeaders = new Headers({'content-type': 'application/json', ...(headers || {})});

  //     if(valueStorage.getItem(tokenKey)){
  //         fetchHeaders.append("authorization", "Bearer "+ valueStorage.getItem(tokenKey))
  //     }

  //     return fetch(url, {
  //         method: method,
  //         headers: fetchHeaders, body: JSON.stringify(data)
  //     }).then(x => {
  //         return x.json();
  //     });
  // }
}

export const httpService = new HttpService();
