export default (value) => {
  const dataf = new Date(value)
  return dataf.toLocaleString(['en-US'], {month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'})
}
