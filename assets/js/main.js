document.querySelectorAll('.project-plate').forEach(function (plate) {
  plate.addEventListener('mouseenter', function () {
    plate.classList.add('is-hover');
  });
  plate.addEventListener('mouseleave', function () {
    plate.classList.remove('is-hover');
  });
});
