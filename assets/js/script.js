var f=0;
function polyfillsAreLoaded(){if(f)return;f=1;
  var tmp, i, w = window, d=document;
  gumshoe.init({selectorHeader: '[data-gumshoe]'});
  smoothScroll.init({selectorHeader: '[data-gumshoe]'});
  NProgress.done();

  // scrollspy
  var lastScrollTop = 0;
  function scrollspy(e){
    var st = getScroll().y;
    if (getViewport().w < 480) {
      if (st > lastScrollTop && st > 0 && getViewport().w/(st) < 2){
        addClass(one('.menu'),'folded');  // scroll down
      } else {
        removeClass(one('.menu'),'folded');  // scroll up
      } lastScrollTop = st;
    } else {
      removeClass(one('.menu'),'folded');
    }
    lazyLoad();
  }
  on(w, 'scroll resize', scrollspy);
  // scrollspy

  // apps icon clicked
  on(all('.sliding .modal-wrapper .close, .sliding a.ios-apps-icon'), 'click', function(e) {
    window.latestScroll = window.latestScroll || 0;
    e.preventDefault();
    var dest = '#'+this.href.split('#')[1];
    if (hasClass(this,'close')) {
      window.scroll({ top: window.latestScroll, left: 0, behavior: 'smooth' });
      setTimeout(function(){
        addClass(all('.icon-rows'),'open');
        removeClass(all('.sliding .modal-wrapper'),'open');
      },300);
    }else{
      if (!hasClass(one(dest),'open')) {
        window.latestScroll = getScroll().y;
        removeClass(all('.sliding .modal-wrapper'),'open');
        setTimeout(function(){
          removeClass(all('.icon-rows'),'open');
          addClass(one(dest),'open');
          // skip lazyload on this particular img
          tmp = one(dest + ' .gallery .ratio img.lazyload');
          if (tmp && tmp.dataset.src) {
            tmp.src = tmp.dataset.src;
            delete tmp.dataset.src;
            removeClass(tmp, 'lazyload');
          }
        },300);
      }
    }
    return false; // (history.pushState)?history.pushState(null, null, dest):location.hash = dest;
  });
  // apps icon clicked

  // gallery nav clicked
  on(all('.gallery .prev, .gallery .next'), 'click', function(e) {
    e.preventDefault();
    var idx = (hasClass(this, 'prev')) ? -1 : 1 ;
    var gallery = this.parentNode;
    var list = JSON.parse(gallery.dataset.img);
    var last = list.length-1;
    var img = one('img', gallery);
    idx += 1*gallery.dataset.idx || 0;
    idx = (idx < 0) ? last : (idx>last) ? 0 : idx;
    addClass(img, 'ease');
    on(img, 'load', function (data) { this.style.opacity='1'; });
    img.style.opacity='.3';
    setTimeout(function(){ img.src = list[idx]; },200);
    this.parentNode.dataset.idx = idx;
    return false;
  });
  // gallery nav clicked

  // lazyload image + gallery
  function lazyLoad() {
    var g = all('img.lazyload'); i = g.length;
    while (i--) {
      if(isElementInViewport(g[i]) && g[i].dataset.src && g[i].src.indexOf('data:image')==0){
        g[i].src = g[i].dataset.src;
        delete g[i].dataset.src;
        removeClass(g[i], 'lazyload');
      }
    }
  } lazyLoad(); on(w,'hashchange',lazyLoad);
  // lazyload image + gallery
}
setTimeout(polyfillsAreLoaded,3000);
var loadDeferredStyles = function() {
  i = one('#deferred-styles'); if (i) {
    tmp = document.createElement('var');
    tmp.innerHTML = i.textContent;
    document.head.appendChild(tmp);
    i.parentElement.removeChild(i);
  }
};
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });
else window.addEventListener('load', loadDeferredStyles);
/*
*/
