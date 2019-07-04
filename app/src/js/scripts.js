(function() {
    var mySwiper = new Swiper ('.swiper-container', {
      // Optional parameters
        slidesPerView: 2,
        loop: true,
        spaceBetween: 20,
        breakpoints: {
            1110: {
                slidesPerView: 1,
                spaceBetween: 10,
                centeredSlides: true,
            }
        },
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

    })
}())

;(function() {
    document.querySelectorAll('.modal-open')
          .forEach(input => input.addEventListener('click', function(e) {
              e.preventDefault();
              let win = this.getAttribute('href').slice(1);
              document.getElementById(win).style.display = 'flex';
              document.querySelector('html').style.overflow = "hidden";
          }), false);

      document.querySelectorAll('.modal__close')
          .forEach(input => input.addEventListener('click', function(e) {
              e.preventDefault();
              this.parentElement.parentElement.style.display = 'none';
              document.querySelector('html').style.overflow = "inherit";
          }, false));

      let modal = document.querySelectorAll('.modal');
      window.onclick = function(event) {
          for (var i = 0; i < modal.length; i++) {
              if (event.target == modal[i]) {
                  modal[i].style.display = "none";
                  document.querySelector('html').style.overflow = "inherit";
              }
          }
      }
      //sender
      let modalOk = document.querySelector(".pop-result");

      function doValidation(phone) {
          var isValid = false;
          isValid = /^\+?[78]?[\s\-\(]*\d{3}[\s\-\)]*\d{3}\D?\d{2}\D?\d{2}$/.test(phone.value);
          return isValid;
      }

      //sending forms
      var forms = document.forms;
      for (var i = 0; i < forms.length; i++) {
          forms[i].addEventListener("submit", function(event) {
              event.preventDefault();
              let phone = this.phone;
              if (!doValidation(phone)) {
                  phone.classList.add('error');
                  setTimeout(function() {
                      phone.classList.remove('error');
                  }, 1500);
                  return false;
              }
              let data = new FormData(this);
              fetch('./php/sender.php', {
                      method: 'POST',
                      body: data,
                  })
                  .then(resp => {
                      if (resp.status = 200) {
                          this.parentNode.style.display = "none";
                          this.reset();
                          modalOk.parentNode.style.display = "block";
                          setTimeout(function() {
                              modalOk.parentNode.style.display = "none";
                              document.querySelector('html').style.overflow = "auto";
                          }, 3000);
                      }
                  })
                  .catch(err => {
                      console.log(err);
                      alert('Error');
                  });
          });
      }

}());

(function() {
  function yandexMaps(){

      var myMap;
      ymaps.ready(init);

      function init() {
          myMap = new ymaps.Map('map', {
              center: [60.02917506403132,30.327348499999932],
              zoom: 16,
              controls: []
          });
          myMap.geoObjects.add(new ymaps.Placemark([60.02917506403132,30.327348499999932], {
              hintContent: 'СПб ГБУЗ "Больница Св. Георгия". Центр комплексного лечения ожирения и метаболических нарушений',
          }, {
              iconLayout: 'default#image',
          }));

          myMap.controls.remove('searchControl');
          myMap.controls.remove('trafficControl');
          myMap.controls.remove('typeSelector');
          myMap.controls.remove('fullscreenControl');
          myMap.controls.remove('zoomControl');
          myMap.controls.remove('GeolocationControl');
          myMap.behaviors.disable('scrollZoom');
      }
  }

  yandexMaps();
}());
