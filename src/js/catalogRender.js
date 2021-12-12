const catalogRender = (data, container) => {
  const active_category = "modal-catalog-category-name__item_active";

  const categories = [];

  const getCategories = (data) => {
    data.forEach((item) => {
      if (!categories.includes(item.category)) {
        categories.push(item.category);
      }
    });
  };
  getCategories(data);

  const renderCategoriesName = (block) => {
    const categoryBlock = document.createElement("div");
    categoryBlock.classList.add("modal-catalog-category-name");

    categories.forEach((category) => {
      categoryBlock.innerHTML += `<div
        class="
          modal-catalog-category-name__item
        " data-category="${category}"
      >
        ${category}
        <span class="modal-catalog-category-name__item_arrow">
          &#8594;</span
        >
      </div>`;

      block.append(categoryBlock);
    });
  };

  const renderSubcategories = (block, subcategory, href, img) => {
    block.innerHTML += `
      <div class="modal-catalog-category-subcategory-item" data-href=${href}>
        <img
          src="./images/db/${img}"
          alt="${subcategory}"
          class="modal-catalog-category-subcategory-item__img"
        />
        <div class="modal-catalog-category-subcategory-item__title">
         ${subcategory}
        </div>
      </div>
    `;

    block
      .querySelectorAll(".modal-catalog-category-subcategory-item")
      .forEach((item) => {
        item.addEventListener("click", () => {
          window.location.href = item.dataset.href;
        });
      });
  };

  const renderCatalog = (data) => {
    const div = document.createElement("div");
    div.classList.add("modal-catalog-category-container");
    renderCategoriesName(div);

    const subcategoryBlock = document.createElement("div");
    subcategoryBlock.classList.add("modal-catalog-category-subcategory");

    div.append(subcategoryBlock);
    container.append(div);

    const categoryName = container.querySelectorAll(
      ".modal-catalog-category-name__item"
    );
    categoryName.forEach((item) => {
      item.addEventListener("click", () => {
        container.querySelector(
          ".modal-catalog-category-subcategory"
        ).innerHTML = "";
      });
    });

    data.forEach((item) => {
      const { id, category, subcategory, href, img } = item;

      if (category === categories[0]) {
        renderSubcategories(subcategoryBlock, subcategory, href, img);
      }

      const changeSubcategories = (container) => {
        const categoryName = container.querySelectorAll(
          ".modal-catalog-category-name__item"
        );
        categoryName.forEach((item) => {
          item.addEventListener("click", () => {
            categoryName.forEach((item) => {
              item.classList.remove(active_category);
            });
            item.classList.add(active_category);
            if (item.dataset.category === category) {
              renderSubcategories(subcategoryBlock, subcategory, href, img);
            }
          });
        });
      };
      changeSubcategories(container);
    });

    categoryName[0].classList.add(active_category);
  };

  renderCatalog(data);
};
