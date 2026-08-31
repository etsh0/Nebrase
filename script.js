/* =============================================
   AOS Initialization
   ============================================= */
AOS.init({
  duration: 800,
  once: true,
  offset: 80,
  easing: "ease-out-cubic",
});

/* =============================================
   Mobile Menu Toggle (Smooth Open/Close)
   ============================================= */
const hamburgerBtn = document.getElementById("hamburger-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (hamburgerBtn && mobileMenu) {
  hamburgerBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    hamburgerBtn.classList.toggle("hamburger-open", isOpen);
    hamburgerBtn.setAttribute("aria-expanded", isOpen);
    mobileMenu.setAttribute("aria-hidden", !isOpen);
  });

  // Close mobile menu when any link inside it is clicked
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      hamburgerBtn.classList.remove("hamburger-open");
      hamburgerBtn.setAttribute("aria-expanded", "false");
      mobileMenu.setAttribute("aria-hidden", "true");
    });
  });
}

/* =============================================
   FAQ Accordion Functionality (Smooth Animation)
   ============================================= */
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const btn = item.querySelector(".faq-btn");
  const content = item.querySelector(".faq-content");
  const question = item.querySelector(".faq-question");
  const icon = item.querySelector(".faq-icon");

  btn.addEventListener("click", () => {
    const isExpanded = btn.getAttribute("aria-expanded") === "true";

    // Close all other items for a clean accordion effect
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        const otherBtn = otherItem.querySelector(".faq-btn");
        const otherContent = otherItem.querySelector(".faq-content");
        const otherQuestion = otherItem.querySelector(".faq-question");
        const otherIcon = otherItem.querySelector(".faq-icon");

        otherBtn.setAttribute("aria-expanded", "false");
        otherContent.classList.remove("grid-rows-[1fr]");
        otherContent.classList.add("grid-rows-[0fr]");
        otherItem.classList.remove("bg-[#EEFEFF]", "border-[#1f979a]/40");
        otherItem.classList.add("bg-white", "border-[#C0C0C0]");
        otherQuestion.classList.remove("text-primary");
        otherQuestion.classList.add("text-[#000000]");
        otherIcon.classList.remove("rotate-180", "text-primary");
      }
    });

    // Toggle current item with smooth transition
    if (isExpanded) {
      btn.setAttribute("aria-expanded", "false");
      content.classList.remove("grid-rows-[1fr]");
      content.classList.add("grid-rows-[0fr]");
      item.classList.remove("bg-[#EEFEFF]", "border-[#1f979a]/40");
      item.classList.add("bg-white", "border-[#C0C0C0]");
      question.classList.remove("text-primary");
      question.classList.add("text-[#000000]");
      icon.classList.remove("rotate-180", "text-primary");
    } else {
      btn.setAttribute("aria-expanded", "true");
      content.classList.remove("grid-rows-[0fr]");
      content.classList.add("grid-rows-[1fr]");
      item.classList.remove("bg-white", "border-[#C0C0C0]");
      item.classList.add("bg-[#EEFEFF]", "border-[#1f979a]/40");
      question.classList.remove("text-[#000000]");
      question.classList.add("text-primary");
      icon.classList.add("rotate-180", "text-primary");
    }
  });
});

// =============================================
// Sticky Stacked Cards Scroll Observer
// =============================================
const stageStickies = document.querySelectorAll(".stage-sticky");
if (stageStickies.length > 0) {
  const updateStickyStacking = () => {
    if (window.innerWidth < 768) {
      stageStickies.forEach((sticky) => {
        const card = sticky.querySelector(".stage-card");
        if (card) card.classList.remove("is-stacked");
      });
      return;
    }

    stageStickies.forEach((sticky, idx) => {
      if (idx < stageStickies.length - 1) {
        const nextSticky = stageStickies[idx + 1];
        const nextRect = nextSticky.getBoundingClientRect();
        const card = sticky.querySelector(".stage-card");
        if (card) {
          // If the next card has reached or passed the sticky top threshold (140px)
          if (nextRect.top <= 140) {
            card.classList.add("is-stacked");
          } else {
            card.classList.remove("is-stacked");
          }
        }
      }
    });
  };

  window.addEventListener("scroll", updateStickyStacking, { passive: true });
  window.addEventListener("resize", updateStickyStacking, { passive: true });
  updateStickyStacking();
}
