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
