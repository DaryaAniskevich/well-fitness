const addToTabs = (tabItem, localStorageItem) => {
  const positionsArray = localStorage.getItem(localStorageItem)
    ? JSON.parse(localStorage.getItem(localStorageItem))
    : [];
  if (!positionsArray.some((item) => item.id === tabItem.id)) {
    positionsArray.push(tabItem);
  }
  localStorage.removeItem(localStorageItem);
  localStorage.setItem(localStorageItem, JSON.stringify(positionsArray));
};
