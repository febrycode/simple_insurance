const truncateTable = (modelName) => {
  modelName.forEach((elem) => {
    elem.destroy({
      where: {},
      force: true
    })
  })
}

module.exports = async function truncate(model) {
  if (model) {
    return truncateTable(model)
  }
}