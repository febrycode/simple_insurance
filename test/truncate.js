const truncateTable = (modelName) => {
  modelName.destroy({where: {}}).then(function () {});
}

module.exports = async function truncate(model) {
  if (model) {
    return truncateTable(model)
  }
}