const LOCALSTORAGE_ITEM_NAME = "userDataCatalog";
const getToken = () => {
  const storedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEM_NAME));

  return storedData?.attributes?.token;
};

export default getToken;
