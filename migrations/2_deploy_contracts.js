const DAO = artifacts.require('DAO')

module.exports = async function (deployer) {
  await deployer.deploy(DAO)
}
