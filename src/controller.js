const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("./configs/config");
const routes = require("./routes");
const apiCall = require("./service").apiCall;
const createAudit = require("./audit/audit.service");
const globalRoutingFunction = async (req, res) => {
  const method = req.method.toLowerCase();
  const body = req.body;
  const params = req.params;
  const query = req.query;
  const currentRouteObj = _.find(routes, (route) => {
    const routePathSegments = route.api.split("/");
    if (routePathSegments[routePathSegments.length - 1] === "") {
      routePathSegments.pop(); // Remove the last empty segment
    }
    const reqPathSegments = req.url.split("?")[0].split("/");
    if (reqPathSegments[reqPathSegments.length - 1] === "") {
      reqPathSegments.pop(); // Remove the last empty segment
    }

    if (routePathSegments.length !== reqPathSegments.length) {
      return false;
    }
    for (let i = 0; i < routePathSegments.length; i++) {
      if (routePathSegments[i].startsWith(":")) continue;
      if (routePathSegments[i] !== reqPathSegments[i]) return false;
    }
    return route.methods.includes(method);
  });
  let response;
  if (currentRouteObj.isAuthenticated) {
    const token = await signJwt(req.userInfo);
    response = await apiCall(
      method,
      params,
      query,
      body,
      currentRouteObj.url,
      token
    );
  } else {
    const token = await signJwt({user:"guest"});
    response = await apiCall(method, params, query, body, currentRouteObj.url,token);
  }
  const userId = req.userInfo ? req.userInfo._id : null;

  const auditData = {
    timestamp: Date.now(),
    microservice: currentRouteObj.microservice,
    url: req.url,
    method: method,
    statusCode: response.status,
    userId: userId,
    userAgent: req.headers["user-agent"],
    result: response.data,
    success: response.success,
    headers: req.headers,
    params: params,
    body: body,
  };
  createAudit(auditData);

  return res.status(response.status).send(response.data);
};

const signJwt = async (payload) => {
  const secretKey = config.jwtSecret;
  const options = {
    expiresIn: "1h", // Token expiration time
  };
  return jwt.sign(payload, secretKey, options);
};

module.exports = globalRoutingFunction;
