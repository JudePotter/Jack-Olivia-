document.querySelectorAll('.project-plate').forEach(function (plate) {
  plate.addEventListener('mouseenter', function () {
    plate.classList.add('is-hover');
  });
  plate.addEventListener('mouseleave', function () {
    plate.classList.remove('is-hover');
  });
});

// Mobile only (≤768px): header shrinks after a small scroll, hides
// entirely on scroll-down, reappears the instant you scroll up.
// Desktop is completely unaffected — this never runs above the breakpoint.
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;

  var mq = window.matchMedia('(max-width: 768px)');
  var lastTop = 0;
  var active = false;

  function onScroll() {
    var top = window.scrollY || window.pageYOffset;
    header.classList.toggle('m-condensed', top > 30);
    if (top > lastTop && top > 80) {
      header.classList.add('m-hide');
    } else {
      header.classList.remove('m-hide');
    }
    lastTop = top;
  }

  function enable() {
    if (active) return;
    active = true;
    lastTop = window.scrollY || window.pageYOffset;
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function disable() {
    if (!active) return;
    active = false;
    window.removeEventListener('scroll', onScroll);
    header.classList.remove('m-condensed', 'm-hide');
  }

  function sync() {
    if (mq.matches) {
      enable();
    } else {
      disable();
    }
  }

  sync();
  mq.addEventListener('change', sync);
})();

// What We Do / CV pages: highlight the LHS index item matching whichever
// RHS section is currently in view.
(function () {
  var sections = document.querySelectorAll('.wwd-section, .cv-section');
  if (!sections.length) return;

  var navItems = document.querySelectorAll('.wwd-nav-item, .cv-nav-item');
  var byId = {};
  navItems.forEach(function (item) {
    var id = item.getAttribute('href').replace('#', '');
    byId[id] = item;
  });

  function setActive(id) {
    navItems.forEach(function (item) { item.classList.remove('active'); });
    if (byId[id]) byId[id].classList.add('active');
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

  sections.forEach(function (section) { observer.observe(section); });
})();

// FAQs page: clicking a question in the LHS index swaps in its answer
// on the right, rather than expanding an accordion in place — long
// answers get their own scrollable pane instead of overflowing the page.
(function () {
  var navItems = document.querySelectorAll('.faqs-nav-item');
  if (!navItems.length) return;

  var panels = document.querySelectorAll('.faqs-panel');
  var answerPane = document.querySelector('.faqs-answer');
  var mq = window.matchMedia('(max-width: 768px)');

  function activate(id, updateHash) {
    navItems.forEach(function (item) {
      item.classList.toggle('active', item.getAttribute('href') === '#' + id);
    });
    var target = null;
    panels.forEach(function (panel) {
      var isMatch = panel.id === id;
      panel.classList.toggle('active', isMatch);
      if (isMatch) target = panel;
    });
    if (updateHash && history.replaceState) {
      history.replaceState(null, '', '#' + id);
    }
    if (mq.matches && target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (answerPane) {
      answerPane.scrollTop = 0;
    }
  }

  navItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      activate(item.getAttribute('href').replace('#', ''), true);
    });
  });

  var initial = window.location.hash ? window.location.hash.replace('#', '') : null;
  if (initial && document.getElementById(initial)) {
    activate(initial, false);
  }
})();
