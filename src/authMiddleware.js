const axios = require("axios");
const createAudit = require("./audit/audit.service");
const config = require("./configs/config");
async function authenticateFunctionMiddleware(req, res, next) {
  const auditData = {
    url: req.originalUrl,
    method: req.method,
    userId: null,
    userAgent: req.headers["user-agent"],
    success: false,
    headers: req.headers,
    params: req.params,
    body: req.body,
  };
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    auditData.result = error.message;
    auditData.statusCode = error.statusCode;
    createAudit(auditData);
    return res.status(error.statusCode).send(error.message);
  }
  const token = authHeader.split(" ")[1];

  const apiUrl = config.apiUrl;

  // Define the headers with the JWT token
  const headers = {
    Authorization: `bearer ${token}`,
  };

  try {
    const response = await axios.get(apiUrl, { headers });
    req.userInfo = response.data;
    next();
  } catch (error) {
    if (!(error.response === undefined)) {
      auditData.result = error.response.data;
      auditData.statusCode = error.response.status;
      createAudit(auditData);
      return res.status(error.response.status).send(error.response.data);
    } else {
      auditData.statusCode = 500;
      auditData.result = "server error";
      createAudit(auditData);
      return res.status(500).send("server error");
    }
  }
}
module.exports = authenticateFunctionMiddleware;
