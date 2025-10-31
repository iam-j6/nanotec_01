(function($) {

  "use strict";

  // init Isotope
	var initIsotope = function () {

		$('.grid').each(function () {

			// $('.grid').imagesLoaded( function() {
			// images have loaded
			var $buttonGroup = $('.button-group');
			var $checked = $buttonGroup.find('.is-checked');
			var filterValue = $checked.attr('data-filter');

			var $grid = $('.grid').isotope({
				itemSelector: '.portfolio-item',
				// layoutMode: 'fitRows',
				filter: filterValue
			});

			// bind filter button click
			$('.button-group').on('click', 'a', function (e) {
				e.preventDefault();
				filterValue = $(this).attr('data-filter');
				$grid.isotope({ filter: filterValue });
			});

			// change is-checked class on buttons
			$('.button-group').each(function (i, buttonGroup) {
				$buttonGroup.on('click', 'a', function () {
					$buttonGroup.find('.is-checked').removeClass('is-checked');
					$(this).addClass('is-checked');
				});
			});
			// });

		});
	}

  var initTexts = function(){
    // Wrap every letter in a span
     $('.txt-fx').each(function(){
      this.innerHTML = this.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    });

    anime.timeline()
      .add({
        targets: '.txt-fx .letter',
        translateX: [0,-30],
        opacity: [1,0],
        easing: "easeInExpo",
        duration: 100,
        delay: (el, i) => 0
      });
  }
  var animateTexts = function(){

    anime.timeline()
      .add({
        targets: '.slick-current .txt-fx .letter',
        translateX: [40,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 30 * i
      });
  }

  var hideTexts = function(){

    anime.timeline()
      .add({
        targets: '.slick-current .txt-fx .letter',
        translateX: [0,-30],
        opacity: [1,0],
        easing: "easeInExpo",
        duration: 1100,
        delay: (el, i) => 30 * i
      })
  }

  // initialize all the sliders
  var initSlider = function() {
    // homepage slider | slick slider
    $('.main-slider').slick({
        autoplay: true,
        autoplaySpeed: 4000,
        fade: true,
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
    });

    $('.main-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
      hideTexts();
      console.log('beforeChange');
    });

    $('.main-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
      animateTexts();
      console.log('afterChange');
    });
    
    initTexts();
    animateTexts();
  }

  // animate search box
  var searchButton = function() {
    // search box toggle
    $('#header-wrap').on('click', '.search-toggle', function(e) {
      var selector = $(this).data('selector');

      $(selector).toggleClass('show').find('.search-input').focus();
      $(this).toggleClass('active');

      e.preventDefault();
    });


    // close when click off of container
    $(document).on('click touchstart', function (e){
      if (!$(e.target).is('.search-toggle, .search-toggle *, #header-wrap, #header-wrap *')) {
        $('.search-toggle').removeClass('active');
        $('#header-wrap').removeClass('show');
      }
    });
  }

  // initialize tabs
  var jsTabs = function() {
    // portfolio tabs
    const tabs = document.querySelectorAll('[data-tab-target]')
    const tabContents = document.querySelectorAll('[data-tab-content]')

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => {
          tabContent.classList.remove('active')
        })
        tabs.forEach(tab => {
          tab.classList.remove('active')
        })
        tab.classList.add('active')
        target.classList.add('active')
      })
    });
  }

  // stick header on the top
  var stickyHeader = function() {
    // header menu
    var StickyHeader = new hcSticky('#header.fixed', {
      stickTo: 'body',
      top: 0,
      bottomEnd: 200,
      responsive: {
        1024: {
          disable: true
        }
      }
    });
  }

  //Overlay Menu Navigation
  var overlayMenu = function () {

    if(!$('.nav-overlay').length) {
      return false;
    }

    var body = undefined;
    var menu = undefined;
    var menuItems = undefined;
    var init = function init() {
      body = document.querySelector('body');
      menu = document.querySelector('.menu-btn');
      menuItems = document.querySelectorAll('.nav__list-item');
      applyListeners();
    };
    var applyListeners = function applyListeners() {
      menu.addEventListener('click', function () {
        return toggleClass(body, 'nav-active');
      });
    };
    var toggleClass = function toggleClass(element, stringClass) {
      if (element.classList.contains(stringClass)) element.classList.remove(stringClass);else element.classList.add(stringClass);
    };
    init();
  }

  // init Chocolat light box
  var initChocolat = function() {
    Chocolat(document.querySelectorAll('.image-link'), {
        imageSize: 'contain',
        loop: true,
    })
  }

  $(document).ready(function(){

    stickyHeader();
    searchButton();
    initSlider();
    jsTabs();
    initChocolat();
    overlayMenu();

    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-keep-img"), {
      keepImg: true,
    });

  }); // End of document ready

  // preloader
	$(window).load(function () {
		$(".preloader").fadeOut("slow");
		initIsotope();
	});

})(jQuery);

/******************************************************************************************************************************* */
/******************************************************************************************************************************* */
/******************************************************************************************************************************* */
/******************************************************************************************************************************* */
/*Slider-Marcas-1*************************************************************************************************************** */

document.addEventListener('DOMContentLoaded', () => {
  const sliderWrapper = document.querySelector('.js-slider-wrapper-Marcas1');
  const slides = document.querySelectorAll('.js-slide-Marcas1');
  const prevButton = document.querySelector('.js-prev-Marcas1');
  const nextButton = document.querySelector('.js-next-Marcas1');
  const dotsContainer = document.querySelector('.js-dots-Marcas1');

  let currentSlide = 0;
  const slideWidth = slides[0].clientWidth; // Ancho de un slide
  const totalSlides = slides.length;
  let autoSlideInterval;
  const autoSlideDelay = 3000; // 3 segundos

  // Función para mover el slider
  function moveSlider() {
    sliderWrapper.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
    updateDots();
  }

  // Actualizar los puntos de navegación
  function updateDots() {
    dotsContainer.innerHTML = ''; // Limpiar puntos existentes
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('span');
      dot.classList.add('js-dot-Marcas1');
      if (i === currentSlide) {
        dot.classList.add('active');
      }
      dot.addEventListener('click', () => {
        currentSlide = i;
        moveSlider();
        resetAutoSlide(); // Reiniciar el temporizador al hacer clic en un punto
      });
      dotsContainer.appendChild(dot);
    }
  }

  // Navegación manual
  nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    moveSlider();
    resetAutoSlide();
  });

  prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    moveSlider();
    resetAutoSlide();
  });

  // Función para el deslizamiento automático
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      moveSlider();
    }, autoSlideDelay);
  }

  // Reiniciar el deslizamiento automático
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Pausar al pasar el ratón (opcional)
  sliderWrapper.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });

  sliderWrapper.addEventListener('mouseleave', () => {
    startAutoSlide();
  });

  // Inicializar el slider
  updateDots();
  startAutoSlide();
});

/******************************************************************************************************************************* */
/******************************************************************************************************************************* */
/******************************************************************************************************************************* */
/******************************************************************************************************************************* */
/*Slider-Marcas-2*************************************************************************************************************** */

document.addEventListener('DOMContentLoaded', () => {
  const sliderWrapper = document.querySelector('.js-slider-wrapper-Marcas2');
  const slides = document.querySelectorAll('.js-slide-Marcas2');
  const prevButton = document.querySelector('.js-prev-Marcas2');
  const nextButton = document.querySelector('.js-next-Marcas2');
  const dotsContainer = document.querySelector('.js-dots-Marcas2');

  let currentSlide = 0;
  const slideWidth = slides[0].clientWidth; // Ancho de un slide
  const totalSlides = slides.length;
  let autoSlideInterval;
  const autoSlideDelay = 3000; // 3 segundos

  // Función para mover el slider
  function moveSlider() {
    sliderWrapper.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
    updateDots();
  }

  // Actualizar los puntos de navegación
  function updateDots() {
    dotsContainer.innerHTML = ''; // Limpiar puntos existentes
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('span');
      dot.classList.add('js-dot-Marcas2');
      if (i === currentSlide) {
        dot.classList.add('active');
      }
      dot.addEventListener('click', () => {
        currentSlide = i;
        moveSlider();
        resetAutoSlide(); // Reiniciar el temporizador al hacer clic en un punto
      });
      dotsContainer.appendChild(dot);
    }
  }

  // Navegación manual
  nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    moveSlider();
    resetAutoSlide();
  });

  prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    moveSlider();
    resetAutoSlide();
  });

  // Función para el deslizamiento automático
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      moveSlider();
    }, autoSlideDelay);
  }

  // Reiniciar el deslizamiento automático
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Pausar al pasar el ratón (opcional)
  sliderWrapper.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });

  sliderWrapper.addEventListener('mouseleave', () => {
    startAutoSlide();
  });

  // Inicializar el slider
  updateDots();
  startAutoSlide();
});

/******************************************************************************************************************************* */
/******************************************************************************************************************************* */
/******************************************************************************************************************************* */
/******************************************************************************************************************************* */
/*Slider-Marcas-3*************************************************************************************************************** */

document.addEventListener('DOMContentLoaded', () => {
  const sliderWrapper = document.querySelector('.js-slider-wrapper-Marcas3');
  const slides = document.querySelectorAll('.js-slide-Marcas3');
  const prevButton = document.querySelector('.js-prev-Marcas3');
  const nextButton = document.querySelector('.js-next-Marcas3');
  const dotsContainer = document.querySelector('.js-dots-Marcas3');

  let currentSlide = 0;
  const slideWidth = slides[0].clientWidth; // Ancho de un slide
  const totalSlides = slides.length;
  let autoSlideInterval;
  const autoSlideDelay = 3000; // 3 segundos

  // Función para mover el slider
  function moveSlider() {
    sliderWrapper.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
    updateDots();
  }

  // Actualizar los puntos de navegación
  function updateDots() {
    dotsContainer.innerHTML = ''; // Limpiar puntos existentes
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('span');
      dot.classList.add('js-dot-Marcas3');
      if (i === currentSlide) {
        dot.classList.add('active');
      }
      dot.addEventListener('click', () => {
        currentSlide = i;
        moveSlider();
        resetAutoSlide(); // Reiniciar el temporizador al hacer clic en un punto
      });
      dotsContainer.appendChild(dot);
    }
  }

  // Navegación manual
  nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    moveSlider();
    resetAutoSlide();
  });

  prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    moveSlider();
    resetAutoSlide();
  });

  // Función para el deslizamiento automático
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      moveSlider();
    }, autoSlideDelay);
  }

  // Reiniciar el deslizamiento automático
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Pausar al pasar el ratón (opcional)
  sliderWrapper.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });

  sliderWrapper.addEventListener('mouseleave', () => {
    startAutoSlide();
  });

  // Inicializar el slider
  updateDots();
  startAutoSlide();
});