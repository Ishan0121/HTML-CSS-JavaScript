const slider = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0])
  e.target.matches('.prev') && slider.prepend(items[items.length-1]);
}

document.addEventListener('click',activate,false);

document.addEventListener('keydown', function(e) {
    const items = document.querySelectorAll('.item');
    if (e.key === 'ArrowRight') {
      slider.appendChild(items[0]);
    } else if (e.key === 'ArrowLeft') {
      slider.insertBefore(items[items.length - 1], items[0]);
    }
  }, false);
  