const axios = require("axios");
async function apiCall(method, params, query, body, url, token = null) {
  let config = {
    method: method,
    url: url,
    headers: {},
  };
  if (token) {
    config.headers["Authorization"] = `bearer ${token}`;
  }

  // Set params if they are provided
  if (params) {
    Object.keys(params).forEach((key) => {
      // Append each property to the URL
      config.url += `/${params[key]}`;
    });
  }

  // Add query parameters if provided
  if (query) {
    config.url += `?${new URLSearchParams(query)}`;
  }

  // Add body if provided
  if (body) {
    config.data = body;
  }

  try {
    const response = await axios(config);
    return { status: response.status, data: response.data, success: true };
  } catch (error) {
    if (!(error.response === undefined)) {
      return {
        status: error.response.status,
        data: error.response.data,
        success: false,
      };
    } else {
      return {
        status: 500,
        data: "server error",
        success: false,
      };
    }
  }
}

module.exports.apiCall = apiCall;
