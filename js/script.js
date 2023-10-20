document.addEventListener('DOMContentLoaded', function() {
    var icone = document.getElementById('icone');
  
    icone.addEventListener('mouseover', function() {
      icone.classList.remove('fa-regular');
      icone.classList.add('fa-solid');
    });
  
    icone.addEventListener('mouseout', function() {
      icone.classList.remove('fa-solid');
      icone.classList.add('fa-regular');
    });
  });
  