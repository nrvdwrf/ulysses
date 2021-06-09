async function tableRequest (context, storeAction, props, filterFields = []) {
  const
    { sortBy, descending, rowsPerPage, page } = props.pagination,
    filter = props.filter,
    { query, type } = props

  let apiQuery = {
    $limit: rowsPerPage,
    $skip: (page - 1) * rowsPerPage,
    type,
    $sort: sortBy ? { [sortBy]: descending ? '-1' : '1' } : undefined
  }

  context.loading = true

  if (query) {
    apiQuery = Object.assign(apiQuery, query)
  }

  if (filter && filter.length) {
    if (Array.isArray(filterFields)) {
      apiQuery.$or = []
      for (let key of filterFields) {
        const q = {}
        q[key] = { $search: filter }
        apiQuery.$or.push(q)
      }
    }
    else if (typeof filterFields === 'string') {
      apiQuery[filterFields] = { $search: filter }
    }
  }
  // console.debug('Data query', query)
  try {
    const result = await context.$store.dispatch(storeAction, { query: apiQuery })
    if (Array.isArray(result)) {
      context.data = result
      context.pagination.rowsNumber = result.length
      context.pagination.page = 1
      context.pagination.rowsPerPage = -1
    }
    else if (result) {
      context.data = result.data
      context.pagination.rowsNumber = result.total
      context.pagination.page = (result.skip / result.limit) + 1
      context.pagination.rowsPerPage = result.limit
    }
  }
  catch (err) {
    console.error('Data Error', err)
    throw err
  }

  context.pagination.sortBy = sortBy
  context.pagination.descending = descending

  context.loading = false
}

export default tableRequest
