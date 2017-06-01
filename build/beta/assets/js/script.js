var loadDeferredStyles = function() {
  var defer, tmp, i, w = window, d=document;
  removeClass(document.documentElement, "jsload");
  gumshoe.init({selectorHeader: '[data-gumshoe]'});
  smoothScroll.init({selectorHeader: '[data-gumshoe]'});
  NProgress.done();

  on(document, 'keydown', function(e) {
    e = e || window.event;
    var isEscape = (e.keyCode == 27) || false;
    if (isEscape) { }
  });

  // parallax
  on(window, 'scroll', function(e) {
    one('.hero .cover').style.marginTop = Math.floor(getScroll().y/2)+'px';
    one('.hero .title').style.marginTop = Math.floor(getScroll().y/-1)+'px';
  });
  // parallax

  // hero animation
  function mouseTrigger_HeroAni(e) {
    var data = [
      'ME.SELF',
      'My.SElf',
      '_y.SEph',
      '_YOSEPH',
      '_iOS___',
      '__iOS__',
      '___iOS_',
      '____iOS',
      '___iOS',
      '__iOS',
      '_iOS',
      'iOS'
    ];
    data = e.type=='mouseover' ? data.reverse() : data;
    function ani(el){
      if (w.stackOf_HeroAni && w.stackOf_HeroAni.length) {
        el.innerHTML = w.stackOf_HeroAni.pop();
        setTimeout(function(){ ani(el); },200);
      }
    }
    if (w.stackOf_HeroAni.length<1) {
      w.stackOf_HeroAni = data; ani(one('.hero .title span'));
    } else {
      w.stackOf_HeroAni = data.splice(0,w.stackOf_HeroAni.length);
    }
  }
  w.stackOf_HeroAni = [];
  on(one('.hero .title span'), 'mouseover', mouseTrigger_HeroAni);
  on(one('.hero .title span'), 'mouseout', mouseTrigger_HeroAni);
  on(one('.hero .title span'), 'mouseout', mouseTrigger_HeroAni);
  // hero animation

  // gallery
  var btn = all('.gallery .prev, .gallery .next');
  i = btn.length;
  while (i--) {
    on(btn[i], 'click', function(e) {
      var inc = (this.className=='prev') ? -1 : 1 ;
      var img = JSON.parse(this.parentNode.dataset.img);
      var idx = 1*this.parentNode.dataset.idx || 0;
      idx = (idx + inc < 0) ? img.length-1 : (idx + inc > img.length-1) ? 0 : idx + inc;
      on(one('img', this.parentNode), 'load', function (data) { this.style.opacity='1'; });
      addClass(one('img', this.parentNode), 'ease');
      one('img', this.parentNode).style.opacity='.3';
      one('img', this.parentNode).src = img[idx];
      this.parentNode.dataset.idx = idx;
    });
  };
  // gallery

  // mapbox
  function tryMapbox() {
    try {
      mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VuYXdhbndpamF5YSIsImEiOiJjajM2Zm54cngwNTM3MzNxNjdqOXcxNTZ2In0.U2aHrmrL5HEht8hX2I4FzA';
      lnlt = [139.7242792, 35.5942238];
      map = new mapboxgl.Map({
        container: 'map',
        center: lnlt,
        zoom: 15,
        style: 'mapbox://styles/mapbox/streets-v9'
      });
      marker = new mapboxgl.Marker().setLngLat(lnlt).addTo(map);
    } catch (e) { setTimeout(tryMapbox, 500); }
  }tryMapbox();
  function openGMaps(e) {
    var url = 'https://www.google.co.id/maps/place/Japan,+〒143-0023+Tōkyō-to,+Ōta-ku,+Sannō,+1+Chome−２４−１+凛ｏｍｏｒｉ/@35.5942238,139.7242792,17z/';
    window.open(url, '_blank').focus();
  }
  on(one('.mapboxgl-marker'), 'click', openGMaps);
  // mapbox

  // slack webhook
  function submitContactForm(e) {
    e.preventDefault();
    var el = e.target.elements;
    post(
      JSON.stringify({
        "attachments": [
          {
            "fallback": "New message from — " + el.name.value + "\nJOB — " + el.job.value + "\nEMAIL — "+ el.email.value + "\nMessage — "+ el.msg.value,
            "color": "#36a64f",
            "pretext": "New message",
            "author_name": el.name.value,
            "author_link": "mailto:" + el.email.value + "",
            "author_icon": "https://slack.com/favicon.ico",
            "title": "JOB — " + el.job.value + "",
            "title_link": "mailto:" + el.email.value+ "",
            "fields": [
              {
                "title": "Message",
                "value": el.msg.value,
                "short": false
              }
            ],
            "text": "", "image_url": "", "thumb_url": "",
            "footer": "yoseph.ws",
            "footer_icon": "https://slack.com/favicon.ico",
            "ts": Date.now()/1000
          }
        ]
      }),
      'https://hooks.slack.com/services/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',
      function(data) { console.log(data); }
    );
    return false;
  }
  on(one('#contact form'), 'submit', submitContactForm);
  // slack webhook

  defer = one("#deferred-styles");
  tmp = document.createElement("var");
  tmp.innerHTML = defer.textContent;
  document.head.appendChild(tmp)
  defer.parentElement.removeChild(defer);
};
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });
else window.addEventListener("load", loadDeferredStyles);
