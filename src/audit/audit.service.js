const Audit = require("./audit.model");

const createAudit = async (auditData) => {
  try {
    const audit = new Audit(auditData);
    await audit.save();
    return audit;
  } catch (error) {
    throw new Error("Failed to create audit entry");
  }
};

module.exports = createAudit;
