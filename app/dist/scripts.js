"use strict";new Swiper(".swiper-container",{slidesPerView:2,loop:!0,spaceBetween:20,breakpoints:{1110:{slidesPerView:1,spaceBetween:10,centeredSlides:!0}},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),function(){document.querySelectorAll(".modal-open").forEach(function(e){return e.addEventListener("click",function(e){e.preventDefault();var t=this.getAttribute("href").slice(1);document.getElementById(t).style.display="flex",document.querySelector("html").style.overflow="hidden"})},!1),document.querySelectorAll(".modal__close").forEach(function(e){return e.addEventListener("click",function(e){e.preventDefault(),this.parentElement.parentElement.style.display="none",document.querySelector("html").style.overflow="inherit"},!1)});var o=document.querySelectorAll(".modal");window.onclick=function(e){for(var t=0;t<o.length;t++)e.target==o[t]&&(o[t].style.display="none",document.querySelector("html").style.overflow="inherit")};var r=document.querySelector(".pop-result");for(var e=document.forms,t=0;t<e.length;t++)e[t].addEventListener("submit",function(e){var t=this;e.preventDefault();var o=this.phone;if(!/^\+?[78]?[\s\-\(]*\d{3}[\s\-\)]*\d{3}\D?\d{2}\D?\d{2}$/.test(o.value))return o.classList.add("error"),setTimeout(function(){o.classList.remove("error")},1500),!1;var n=new FormData(this);fetch("./php/sender.php",{method:"POST",body:n}).then(function(e){(e.status=200)&&(t.parentNode.style.display="none",t.reset(),r.parentNode.style.display="block",setTimeout(function(){r.parentNode.style.display="none",document.querySelector("html").style.overflow="auto"},3e3))}).catch(function(e){console.log(e),alert("Error")})})}(),function(){var e;ymaps.ready(function(){(e=new ymaps.Map("map",{center:[60.02917506403132,30.327348499999932],zoom:16,controls:[]})).geoObjects.add(new ymaps.Placemark([60.02917506403132,30.327348499999932],{hintContent:'СПб ГБУЗ "Больница Св. Георгия". Центр комплексного лечения ожирения и метаболических нарушений'},{iconLayout:"default#image"})),e.controls.remove("searchControl"),e.controls.remove("trafficControl"),e.controls.remove("typeSelector"),e.controls.remove("fullscreenControl"),e.controls.remove("zoomControl"),e.controls.remove("GeolocationControl"),e.behaviors.disable("scrollZoom")})}();