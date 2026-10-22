/* ==========================================================================
   Laxmi's Kitchen — interactions
   Renders the menu from assets/js/menu-data.js, handles search, category
   navigation, sharing and small progressive-enhancement details.
   ========================================================================== */

(() => {
  "use strict";

  const data = window.LAXMI_MENU;
  if (!data) return;

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollBehavior = reduceMotion ? "auto" : "smooth";

  const allItems = data.categories.flatMap((category) =>
    category.items.map((item) => ({ ...item, category }))
  );
  const itemsBySlug = new Map(allItems.map((item) => [item.slug, item]));

  /* ---------- Helpers ---------- */
  const escapeHTML = (value) =>
    String(value).replace(/[&<>"']/g, (character) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      return entities[character];
    });

  const normalize = (value) =>
    String(value)
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "");

  const imagePath = (slug) => `assets/images/menu/${slug}.webp`;

  const priceMarkup = (item) => {
    const [first, ...rest] = String(item.price).split(" / ");
    const alt = rest.length ? ` <span class="price__alt">/ ${escapeHTML(rest.join(" / "))}</span>` : "";
    return `<span class="dish__price">₹${escapeHTML(first)}${alt}</span>`;
  };

  const vegMark = `<span class="veg-mark" role="img" aria-label="Vegetarian"></span>`;

  /* ---------- Render featured ---------- */
  const featuredGrid = $("#featured-grid");

  if (featuredGrid) {
    featuredGrid.innerHTML = data.featured
      .map((featured) => {
        const item = itemsBySlug.get(featured.slug);
        if (!item) return "";

        return `
          <article class="feature-card reveal">
            <a
              class="feature-card__media"
              href="#dish-${escapeHTML(item.slug)}"
              data-featured-link="${escapeHTML(item.slug)}"
              aria-label="See ${escapeHTML(item.name)} on the menu"
            >
              <img
                src="${imagePath(item.slug)}"
                alt="A serving of ${escapeHTML(item.name)}"
                width="480"
                height="480"
                loading="lazy"
                decoding="async"
              />
              <span class="feature-card__arrow" aria-hidden="true">
                <svg class="icon"><use href="#icon-arrow-up-right"></use></svg>
              </span>
            </a>
            <div class="feature-card__body">
              <div class="feature-card__meta">
                <span class="feature-card__note">${escapeHTML(featured.note)}</span>
                ${vegMark}
              </div>
              <div class="feature-card__row">
                <h3>${escapeHTML(item.name)}</h3>
                <span class="feature-card__price">₹${escapeHTML(item.price)}</span>
              </div>
              <p class="feature-card__desc">${escapeHTML(item.description)}</p>
              <div class="feature-card__footer">
                ${item.priceNote ? escapeHTML(item.priceNote) : "Made fresh to order"}
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  /* ---------- Render menu ---------- */
  const categoryNav = $("#category-nav");
  const menuGroups = $("#menu-groups");
  const menuCount = $("#menu-count");
  const menuSearch = $("#menu-search");
  const searchClear = $("#search-clear");
  const emptyState = $("#menu-empty");
  const emptyClear = $("#empty-clear");

  if (categoryNav) {
    categoryNav.innerHTML = data.categories
      .map(
        (category, index) => `
          <button
            class="category-chip${index === 0 ? " is-active" : ""}"
            type="button"
            data-target="${escapeHTML(category.id)}"
            ${index === 0 ? 'aria-current="true"' : ""}
          >
            ${escapeHTML(category.title)}
            <span>${category.items.length}</span>
          </button>
        `
      )
      .join("");
  }

  if (menuGroups) {
    menuGroups.innerHTML = data.categories
      .map(
        (category) => `
          <section
            class="menu-group"
            id="${escapeHTML(category.id)}"
            data-category="${escapeHTML(category.id)}"
            aria-labelledby="${escapeHTML(category.id)}-title"
          >
            <header class="menu-group__head reveal">
              <span class="menu-group__num" aria-hidden="true">${escapeHTML(category.number)}</span>
              <div class="menu-group__title">
                <p class="eyebrow">${escapeHTML(category.eyebrow)}</p>
                <h2 id="${escapeHTML(category.id)}-title">${escapeHTML(category.title)}</h2>
                <p>${escapeHTML(category.description)}</p>
              </div>
              <span class="menu-group__count" data-category-count>
                ${category.items.length} ${category.items.length === 1 ? "dish" : "dishes"}
              </span>
            </header>

            <div class="dish-grid">
              ${category.items
                .map((item) => {
                  const searchText = normalize(
                    `${item.name} ${item.description}`
                  );

                  return `
                    <article
                      class="dish reveal"
                      id="dish-${escapeHTML(item.slug)}"
                      data-slug="${escapeHTML(item.slug)}"
                      data-search="${escapeHTML(searchText)}"
                    >
                      <div class="dish__media">
                        <img
                          src="${imagePath(item.slug)}"
                          alt="A serving of ${escapeHTML(item.name)}"
                          width="480"
                          height="480"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div class="dish__content">
                        <div class="dish__heading">
                          <h3 class="dish__name">
                            ${escapeHTML(item.name)}
                            ${vegMark}
                          </h3>
                          ${priceMarkup(item)}
                        </div>
                        <p class="dish__desc">${escapeHTML(item.description)}</p>
                        ${
                          item.popular || item.priceNote
                            ? `<div class="dish__footer">
                                 ${
                                   item.popular
                                     ? `<span class="tag tag--fav">
                                          <svg class="icon" aria-hidden="true"><use href="#icon-star"></use></svg>
                                          House favourite
                                        </span>`
                                     : ""
                                 }
                                 ${item.priceNote ? `<span class="dish__note">${escapeHTML(item.priceNote)}</span>` : ""}
                               </div>`
                            : ""
                        }
                      </div>
                    </article>
                  `;
                })
                .join("")}
            </div>
          </section>
        `
      )
      .join("");
  }

  if (menuCount) {
    menuCount.textContent = `${allItems.length} dishes`;
  }

  /* ---------- Reveal on scroll ---------- */
  const revealElements = $$(".reveal");
  const supportsObserver = "IntersectionObserver" in window;

  if (revealElements.length) {
    if (reduceMotion || !supportsObserver) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );

      revealElements.forEach((element, index) => {
        element.style.transitionDelay = `${Math.min((index % 4) * 55, 165)}ms`;
        revealObserver.observe(element);
      });
    }
  }

  /* ---------- Search ---------- */
  let searchQuery = "";

  const setCategoryCount = (categoryId, count) => {
    const chip = categoryNav?.querySelector(`[data-target="${categoryId}"]`);
    const chipCount = chip?.querySelector("span");
    if (chipCount) chipCount.textContent = String(count);
    if (chip) chip.hidden = count === 0;

    const group = document.getElementById(categoryId);
    const groupCount = group?.querySelector("[data-category-count]");
    if (groupCount) {
      groupCount.textContent = `${count} ${count === 1 ? "dish" : "dishes"}`;
    }
  };

  let activeCategoryId = "";

  const setActiveCategory = (categoryId) => {
    if (!categoryNav) return;

    const changed = activeCategoryId !== categoryId;
    activeCategoryId = categoryId;

    $$(".category-chip", categoryNav).forEach((chip) => {
      const isActive = chip.dataset.target === categoryId;
      chip.classList.toggle("is-active", isActive);
      if (isActive) {
        chip.setAttribute("aria-current", "true");
      } else {
        chip.removeAttribute("aria-current");
      }
    });

    if (!changed) return;

    const activeChip = categoryNav.querySelector(
      `[data-target="${categoryId}"]`
    );
    if (!activeChip) return;

    const navRect = categoryNav.getBoundingClientRect();
    const chipRect = activeChip.getBoundingClientRect();
    const left =
      categoryNav.scrollLeft +
      (chipRect.left - navRect.left) -
      (navRect.width - chipRect.width) / 2;

    categoryNav.scrollTo({
      left: Math.max(0, left),
      behavior: reduceMotion ? "auto" : "smooth"
    });
  };

  const applySearch = (value) => {
    searchQuery = value.trim();
    const query = normalize(searchQuery);
    let visibleTotal = 0;
    let firstVisibleCategory = null;

    data.categories.forEach((category) => {
      const section = document.getElementById(category.id);
      if (!section) return;

      let visibleCount = 0;
      $$(".dish", section).forEach((card) => {
        const matches = !query || card.dataset.search.includes(query);
        card.hidden = !matches;
        if (matches) visibleCount += 1;
      });

      section.hidden = visibleCount === 0;
      setCategoryCount(category.id, visibleCount);

      if (visibleCount > 0 && !firstVisibleCategory) {
        firstVisibleCategory = category.id;
      }
      visibleTotal += visibleCount;
    });

    if (menuCount) {
      menuCount.textContent = `${visibleTotal} ${visibleTotal === 1 ? "dish" : "dishes"}`;
    }

    if (emptyState) emptyState.hidden = visibleTotal !== 0;
    if (menuGroups) menuGroups.hidden = visibleTotal === 0;

    const searchField = menuSearch?.closest(".search");
    searchField?.classList.toggle("has-value", searchQuery.length > 0);

    if (firstVisibleCategory) {
      setActiveCategory(firstVisibleCategory);
    } else if (categoryNav) {
      $$(".category-chip", categoryNav).forEach((chip) => {
        chip.classList.remove("is-active");
        chip.removeAttribute("aria-current");
      });
    }
  };

  const clearSearch = ({ focus = true } = {}) => {
    if (menuSearch) menuSearch.value = "";
    applySearch("");
    if (focus) menuSearch?.focus();
  };

  menuSearch?.addEventListener("input", (event) => applySearch(event.target.value));
  searchClear?.addEventListener("click", () => clearSearch());
  emptyClear?.addEventListener("click", () => clearSearch());

  document.addEventListener("keydown", (event) => {
    const target = event.target;
    const isTyping =
      target instanceof HTMLElement &&
      (target.matches("input, textarea, select") || target.isContentEditable);

    if (event.key === "/" && !isTyping) {
      event.preventDefault();
      menuSearch?.focus();
    }

    if (event.key === "Escape" && document.activeElement === menuSearch) {
      clearSearch({ focus: false });
      menuSearch.blur();
    }
  });

  /* ---------- Category navigation + scroll spy ---------- */
  const header = $("#site-header");
  const toTop = $("#to-top");

  const getStickyOffset = () => {
    const headerHeight = header?.offsetHeight ?? 0;
    const navHeight = categoryNav?.offsetHeight ?? 0;
    return headerHeight + navHeight + 28;
  };

  const updateActiveFromScroll = () => {
    if (!categoryNav) return;
    const offset = getStickyOffset();
    let current = null;

    data.categories.forEach((category) => {
      const section = document.getElementById(category.id);
      if (!section || section.hidden) return;
      if (section.getBoundingClientRect().top <= offset) {
        current = category.id;
      }
    });

    if (current) setActiveCategory(current);
  };

  categoryNav?.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-target]");
    if (!chip) return;

    const section = document.getElementById(chip.dataset.target);
    if (!section || section.hidden) return;

    setActiveCategory(chip.dataset.target);
    section.scrollIntoView({ behavior: scrollBehavior, block: "start" });
  });

  /* ---------- Featured card → menu item ---------- */
  featuredGrid?.addEventListener("click", (event) => {
    const link = event.target.closest("[data-featured-link]");
    if (!link) return;

    const item = document.getElementById(`dish-${link.dataset.featuredLink}`);
    if (!item) return;

    event.preventDefault();
    item.scrollIntoView({ behavior: scrollBehavior, block: "center" });
    item.classList.remove("is-flash");
    void item.offsetWidth;
    item.classList.add("is-flash");
    window.setTimeout(() => item.classList.remove("is-flash"), 2000);
  });

  /* ---------- Header state + back to top ---------- */
  let ticking = false;

  const onScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    header?.classList.toggle("is-scrolled", scrollY > 12);
    toTop?.classList.toggle("is-visible", scrollY > 720);
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(() => {
        updateActiveFromScroll();
        ticking = false;
      });
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  toTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: scrollBehavior });
  });

  /* ---------- Footer year ---------- */
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Deep links ---------- */
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      window.setTimeout(() => {
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
        if (target.classList.contains("dish")) {
          target.classList.add("is-flash");
          window.setTimeout(() => target.classList.remove("is-flash"), 2000);
        }
      }, 120);
    }
  }
})();
