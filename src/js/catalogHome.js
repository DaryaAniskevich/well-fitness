const catalogHome = () => {
  const catalogHomeBlock = document.querySelector(
    ".modal-catalog-category-home"
  );

  fetch(
    "https://wellfitness-a4db3-default-rtdb.europe-west1.firebasedatabase.app/db/catalog/home.json"
  )
    .then((res) => res.json())
    .then((res) => {
      catalogRender(res, catalogHomeBlock);
    });
};

catalogHome();
