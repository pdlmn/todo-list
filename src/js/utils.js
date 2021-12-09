function formatDate(date) {
  if (isNaN(date.getTime())) return `No due date`

  const yyyy = date.getFullYear();
  const mm = date.getMonth().toString().padStart(2, '0');
  const dd = date.getDate().toString().padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`
}

export {
  formatDate
}
