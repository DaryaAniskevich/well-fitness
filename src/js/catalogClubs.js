const catalogClubs = () => {
  const catalogClubsBlock = document.querySelector(
    ".modal-catalog-category-clubs"
  );

  fetch(
    "https://wellfitness-a4db3-default-rtdb.europe-west1.firebasedatabase.app/db/catalog/club.json"
  )
    .then((res) => res.json())
    .then((res) => {
      catalogRender(res, catalogClubsBlock);
    });
};

catalogClubs();
