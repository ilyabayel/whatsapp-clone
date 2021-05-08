export function setItemsToLocalStorage(items: {[key: string]: string}): void {
  for (const key in items) {
    localStorage.setItem(key, items[key]);
  }
}

export function getItemsFromLocalStorage(...items: string[]): string[] {
  const response = [];
  for (const item of items) {
    response.push(localStorage.getItem(item));
  }
  return response;
}
