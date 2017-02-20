const queryParam = (param) => {
  let p = new URLSearchParams(window.location.search)
  return p.get(param)
}

export { queryParam }