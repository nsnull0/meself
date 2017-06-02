var loadDeferredStyles = function() {
  var defer, tmp, i, w = window, d=document;
  removeClass(document.documentElement, 'jsload');
  gumshoe.init({selectorHeader: '[data-gumshoe]'});
  smoothScroll.init({selectorHeader: '[data-gumshoe]'});
  NProgress.done();

  // scrollspy
  var lastScrollTop = 0;
  on(window, 'scroll', function(){
    var st = getScroll().y;
    if (st > lastScrollTop){ // downscroll code
      addClass(one('.menu'),'folded');
    } else { // upscroll code
      removeClass(one('.menu'),'folded');
    } lastScrollTop = st;
  })
  // scrollspy

  // modal
  w.modal = {
    close: function () {
      one('.modal')?one('.modal').parentNode.removeChild(one('.modal')):0;
    },
    invoke: function (data,onClose) {
      w.modal.close();
      data = data || {};
      tmp = w.modal.data;
      if (data.show && !one('.modal')) {
        var modal=d.createElement('div');
        modal.innerHTML+= '<h1 class="header">' + (data.header?data.header:tmp.header) + '</h1>';
        modal.innerHTML+= '<div class="body">' + (data.body?data.body:tmp.body) + '</div>';
        modal.innerHTML+= '<button class="close"></button>';
        modal.className+= 'modal ' + (data.className?data.className:tmp.className);
        d.body.appendChild(modal);
        on(one('.modal .close'), 'click', function() {
          w.modal.close(); onClose?onClose():0;
        });
        on(document, 'keydown', function(e) {
          e = e || w.event; var isEscape = (e.keyCode == 27) || false;
          if (isEscape) {
            w.modal.close(); onClose?onClose():0;
          }
        });
      } tmp = {}
    },
    data : {
      "show": 0,
      "status": 0,
      "className": "",
      "header": "Header",
      "body": "Body goes here"
    }
  };
  // modal

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
      // '___iOS_',
      // '__iOS__',
      // '_iOS___',
      // 'iOS____'
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
      var inc = (hasClass(this, 'prev')) ? -1 : 1 ;
      var gallery = this.parentNode;
      var img = JSON.parse(gallery.dataset.img);
      var idx = 1*gallery.dataset.idx || 0;
      idx = (idx + inc < 0) ? img.length-1 : (idx + inc > img.length-1) ? 0 : idx + inc;
      addClass(one('img', gallery), 'ease');
      on(one('img', gallery), 'load', function (data) { this.style.opacity='1'; });
      one('img', gallery).style.opacity='.3';
      setTimeout(function(){ one('img', gallery).src = img[idx]; },200);
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
        attributionControl: false,
        logoPosition: 'bottom-right',
        style: 'mapbox://styles/mapbox/streets-v9'
      });
      marker = new mapboxgl.Marker().setLngLat(lnlt).addTo(map);
    } catch (e) { setTimeout(tryMapbox, 500); }
  }tryMapbox();
  function openGMaps(e) {
    var url = 'https://www.google.co.id/maps/place/Japan,+〒143-0023+Tōkyō-to,+Ōta-ku,+Sannō,+1+Chome−２４−１+凛ｏｍｏｒｉ/@35.5942238,139.7242792,17z/';
    w.open(url, '_blank').focus();
  }
  on(one('.mapboxgl-marker'), 'click', openGMaps);
  // mapbox

  // slack webhook
  function submitContactForm(e) {
    e.preventDefault();
    var SUBMIT_RECENTLY = {
      show:1,
      header:'Ooops',
      body:'It looks like you already sent us a message (this is needed to prevent spam), but worry not, as soon as you close this message, you can sent me another message.'
    },  SUBMIT_SENDING = {
      show:1,
      header:'Sending Message',
      body:'Did you know, that your message is travelling via Internet to my slack channel in less than a second!'
    },  SUBMIT_INVALID = {
      show:1,
      header:'Invalid Response',
      body:'Invalid response from server, in case of emergency you can call my number.'
    },  SUBMIT_SENT = {
      show:1,
      header:'Message Sent',
      body:'Your message has been sent, please wait for the next reply.'
    },  SUBMIT_FAILED = {
      show:1,
      header:'Failed',
      body:'Unable to sent your message, probably network connection issue.'
    }
    if (w.recentlySubmitted) {
      modal.invoke(SUBMIT_RECENTLY,0,function() {
        removeClass(one('#contact form'), 'recently-submitted');
        w.recentlySubmitted = !1;
      });
    } else {
      modal.invoke(SUBMIT_SENDING);
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
              "author_icon": "https://www.gravatar.com/avatar/" + md5((el.email.value).trim().toLowerCase()),
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
        function(data){console.log(data);
          if (data=='ok') {
            addClass(one('#contact form'), 'recently-submitted');
            w.recentlySubmitted = true;
            modal.invoke(SUBMIT_SENT);
          } else {
            modal.invoke(SUBMIT_INVALID);
          }
        },
        function(idata){console.log(idata);modal.invoke(SUBMIT_INVALID);},
        function(error){console.log(error);modal.invoke(SUBMIT_FAILED);},
        {},
        0
      );
    }
    return false;
  }
  on(one('#contact form'), 'submit', submitContactForm);
  // slack webhook

  defer = one('#deferred-styles');
  tmp = document.createElement('var');
  tmp.innerHTML = defer.textContent;
  document.head.appendChild(tmp)
  defer.parentElement.removeChild(defer);
};
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });
else window.addEventListener('load', loadDeferredStyles);
