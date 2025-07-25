/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/

window.addEventListener('DOMContentLoaded', event => {

    // 1. Navbar shrink function (scroll ile navbar'ı koyult/şeffaf yap)
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    // Sayfa yüklenince ve scroll olunca fonksiyon tetiklenir
    navbarShrink();
    document.addEventListener('scroll', navbarShrink);

    // 2. Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // 3. Responsive navbar'ı mobilde linke tıklayınca kapat
    // NOT: Artık sadece dropdown-toggle OLMAYAN nav-link'lerde çalışıyor!
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link:not(.dropdown-toggle)')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // 4. GreenAiriva: ID ile scroll-to fonksiyonları (özelleştirilebilir)
    const smoothScrollButtons = [
        { buttonId: 'scrollToContact', sectionId: 'contact' },
        { buttonId: 'scrollToSolutions', sectionId: 'solutions' },
        { buttonId: 'scrollToabout', sectionId: 'about' },
        { buttonId: 'scrollToTeam', sectionId: 'team' }
        // Ekstra buton ve section burada eklenebilir
    ];
    smoothScrollButtons.forEach(({ buttonId, sectionId }) => {
        const btn = document.getElementById(buttonId);
        const section = document.getElementById(sectionId);
        if (btn && section) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                section.scrollIntoView({ behavior: 'smooth' });
                if (history.pushState) {
                    history.pushState(null, null, window.location.pathname);
                }
            });
        }
    });

    // 5. Genel: Tüm anchor (href="#...") linklerinde smooth scroll desteği
    document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
                if (history.pushState) {
                    history.pushState(null, null, window.location.pathname);
                }
            }
        });
    });

    // 6. Sayfa hash ile açıldıysa otomatik smooth scroll (örn. /about/#vision)
    if (window.location.hash) {
        var section = document.querySelector(window.location.hash);
        if (section) {
            setTimeout(function() {
                section.scrollIntoView({ behavior: "smooth" });
            }, 150); // sayfa yüklenince biraz bekleyip kaydır
        }
    }

});
// Sadece dropdown içindeki item veya gerçek nav-link'e tıklanınca menüyü kapat
document.querySelectorAll('.navbar-nav .nav-link, .navbar-nav .dropdown-item').forEach(function(element) {
  element.addEventListener('click', function(e) {
    // Eğer tıklanan element bir dropdown ana başlığı ise (yani dropdown-toggle class'ı varsa), menüyü kapatma
    if (element.classList.contains('dropdown-toggle')) {
      // Sadece dropdown'ı aç/kapat, menüyü kapatma
      return;
    }
    // Eğer tıklanan dropdown menü içindeki bir item veya menüdeki gerçek bir link ise, menüyü kapat
    var navbarCollapse = document.getElementById('navbarResponsive');
    if (navbarCollapse.classList.contains('show')) {
      var bsCollapse = new bootstrap.Collapse(navbarCollapse, {toggle: true});
    }
  });
});

/**
 * Dil geçişi fonksiyonları (Lang Switch) - GreenAiriva Çok Dilli Statik Site
 * Tüm EN ve TR sayfalarında çalışır. Navbar'daki "TR" ve "EN" butonlarında kullanılır.
 * Yazan: ChatGPT / 2025
 */

/**
 * Kullanıcı İngilizce bir sayfadayken TR'ye geçmek isterse,
 * bulunduğu klasörde "tr/index.html" var mıysa oraya yönlendirir.
 */
function switchToTR() {
  // Mevcut sayfanın yolunu al (örn: /about/index.html)
  var path = window.location.pathname;

  // Eğer yol / ile bitiyorsa (örn: /about/), index.html ekle
  if (path.endsWith('/')) path += 'index.html';

  // Eğer zaten /tr/ içindeyse bir daha yönlendirme!
  if (!path.includes('/tr/')) {
    // /index.html'i /tr/index.html'e çevir
    var newPath = path.replace(/\/index\.html$/, '/tr/index.html');
    // Kullanıcıyı yeni yola yönlendir
    window.location.href = newPath;
  }
}

/**
 * Kullanıcı Türkçe bir sayfadayken EN'ye geçmek isterse,
 * bulunduğu klasörde bir üstteki "index.html"e yönlendirir.
 */
function switchToEN() {
  var path = window.location.pathname;

  // Eğer /tr/index.html içindeyse, /index.html'e çevir
  if (path.includes('/tr/index.html')) {
    var newPath = path.replace('/tr/index.html', '/index.html');
    window.location.href = newPath;
  }
  // Eğer yol /tr/ ile bitiyorsa (örn: /about/tr/), /about/index.html'e çevir
  else if (path.endsWith('/tr/')) {
    var newPath = path.replace('/tr/', '/');
    if (!newPath.endsWith('/')) newPath += '/';
    newPath += 'index.html';
    window.location.href = newPath;
  }
  // Eğer başka bir TR varyasyonu yoksa, ana EN ana sayfaya git
  else {
    window.location.href = '/index.html';
  }
}

