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
