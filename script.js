/* =============================================
   AOS Initialization
   ============================================= */
AOS.init({
  once: true,
});

/* =============================================
   Hero Photo Stack — Click to Cycle + Auto Rotate + Hover Tilt
   ============================================= */
(function () {
  const stack = document.getElementById("hero-photo-stack");
  if (!stack) return;

  const cards = Array.from(stack.querySelectorAll(".hero-card"));
  const total = cards.length; // 4

  // card[0] = top, card[total-1] = bottom
  // data-card attribute tracks visual depth (0 = front, 3 = back)

  // Cycle: push front card to the back
  function cycleStack() {
    stack.classList.add("is-cycling");

    // Update data-card attributes: 0→back, others shift forward
    cards.forEach((card) => {
      const cur = parseInt(card.dataset.card, 10);
      const next = (cur + 1) % total;
      card.dataset.card = next;
    });

    setTimeout(() => stack.classList.remove("is-cycling"), 600);
  }

  // Click to cycle
  stack.addEventListener("click", cycleStack);

  // Auto-cycle every 3.5s
  const autoTimer = setInterval(cycleStack, 3500);

  // Pause auto-cycle on hover
  stack.addEventListener("mouseenter", () => clearInterval(autoTimer));

  // Hover tilt parallax
  stack.addEventListener("mousemove", (e) => {
    const rect = stack.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);   // -1 to 1
    const dy = (e.clientY - cy) / (rect.height / 2);  // -1 to 1

    // Apply tilt only to the top card (data-card="0")
    cards.forEach((card) => {
      if (card.dataset.card === "0") {
        card.style.transform = `
          rotate(${dx * 4}deg)
          rotateX(${-dy * 4}deg)
          translateY(0px)
          scale(1)
        `;
      }
    });
  });

  stack.addEventListener("mouseleave", () => {
    // Reset top card to neutral
    cards.forEach((card) => {
      if (card.dataset.card === "0") {
        card.style.transform = "";
      }
    });
  });
})();

/* ── Smooth scroll for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
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
