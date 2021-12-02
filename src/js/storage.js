function saveToLocalStorage(key, obj) {
  const stringifiedObject = JSON.stringify(obj);
  localStorage.setItem(key, stringifiedObject);
}

function parseLocalStorage(key) {
  const stringifiedObject = localStorage.getItem(key);
  const parsedObject = JSON.parse(stringifiedObject);
  return parsedObject
}
