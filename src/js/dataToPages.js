const dataToPages = (data, toShow = 6, pageId = 0) => Object.values(data).splice(toShow * pageId, toShow)

export default dataToPages