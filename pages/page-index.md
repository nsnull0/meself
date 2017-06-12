---
menu_index:     0
permalink:      /
title:          home
custom_header:  true
redirect_from:  /home
className:      index
defer:          |
  <link href="https://api.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.css" rel="stylesheet" />
  <script src="https://api.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.js" defer async></script>
---
<header class="site-header" role="banner">
  <div class="container">
    <nav data-gumshoe-header class="menu fixed no-print">
      <ul data-gumshoe class="inline-menu ease font-montserrat">
        <li><a data-scroll class="btn ease menu-item" href="#me">me.self</a></li>
        <li><a data-scroll class="btn ease menu-item" href="#project">project</a></li>
        <li><a data-scroll class="btn ease menu-item" href="#contact">contact</a></li>
      </ul>
    </nav>
  </div>
</header>
<style>
.index-gradient {
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSI0NSUiIHN0b3AtY29sb3I9IiMzMzMzMzMiIHN0b3Atb3BhY2l0eT0iMSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmZmZmZmIiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InVybCgjZ3JhZC11Y2dnLWdlbmVyYXRlZCkiIC8+Cjwvc3ZnPg==);
  background: -moz-linear-gradient(top,  rgba(51,51,51,1) 45%, rgba(255,255,255,0) 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(45%,rgba(51,51,51,1)), color-stop(100%,rgba(255,255,255,0)));
  background: -webkit-linear-gradient(top,  rgba(51,51,51,1) 45%,rgba(255,255,255,0) 100%);
  background: -o-linear-gradient(top,  rgba(51,51,51,1) 45%,rgba(255,255,255,0) 100%);
  background: -ms-linear-gradient(top,  rgba(51,51,51,1) 45%,rgba(255,255,255,0) 100%);
  background: linear-gradient(to bottom,  rgba(51,51,51,1) 45%,rgba(255,255,255,0) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#333333', endColorstr='#00ffffff',GradientType=0 );
}
</style>
<div class="index-gradient">
<section id="me">
  <div class="hero"><div class="ratio ease"><div>
    <img alt="Cover image" class="cover lazyload" data-src="{{ "/assets/images/cover.jpg" | absolute_url }}" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"/>
    <h1 class="title"><span class="ease font-monospace">ME.SELF</span></h1>
  </div></div></div>
  <div class="container"> {{ site.data.contents.about.text | markdownify }}</div>
  <div class="container" style="max-width:600px;"> {{ site.data.contents.about.quote | markdownify }} </div>
</section>
<section id="project">
  <div class="container">
    <h2>project</h2>
    <div class="popup-modalx sliding">
    <div class="row" style="text-align: center;">
      {% for project in site.data.projects %}
      <div class="col-sm-1-3 col-md-1-6 ios-apps-list ease">
        <a class="ios-apps-icon" href="#project-{{ project.id }}">
          <img class="ios-apps-icon lazyload" alt="Apps icon" data-src="{{ project.icon }}" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"/>
          <span class="screen-reader">🔗 open</span>
        </a>
        <div style="
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: small;
        ">{{ project.name }}</div>
      </div>
      {% endfor %}
      <div class="col-sm-1"></div>
    </div>
    {% for project in site.data.projects %}
    <div class="modal-wrapper ease-slow" id="project-{{ project.id }}">
      <span class="before"></span>
      <a class="btn close" href="#project"><span class="screen-reader">× close</span></a>
      <div class="target-modal">
        <h3>{{ project.name }}</h3>
        {% if project.ios-store or project.and-store %}
        <p class="apps-marketing">
          {% if project.ios-store %}
          <a class="ios-btn" target="_blank" href="{{ project.ios-store }}">
            <img class="lazyload" data-src="https://devimages.apple.com.edgekey.net/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"/>
          </a>
          {% endif %}
          {% if project.and-store %}
          <a class="and-btn" target="_blank" href="{{ project.and-store }}">
            <img class="lazyload" data-src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"/>
          </a>
          {% endif %}
        </p>
        {% endif %}
        <div class="row clear">
          <div class="col-sm-1 col-md-1-2">
            <div class="gallery" data-img='{{ project.gallery | jsonify }}'>
              <div class="ratio ratio-9-16">
                <img alt="Gallery image" class="lazyload" data-src="{{ project.gallery[0] }}" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"/>
              </div>
              <span class="prev ease no-print"></span>
              <span class="next ease no-print"></span>
            </div>
          </div>
          <div class="col-sm-1 col-md-1-2">{{ project.description }}</div>
        </div>
      </div>{{ target-modal }}
    </div>
    {% endfor %}
    </div>
  </div>
</section>
<section id="contact">
  <div class="container">
    <h2>contact</h2>
    <div class="row">
      <div class="col-sm-1 col-md-1-2">
        <div class="map-address">
          <div class="ratio ratio-16-9 checkered">
            <div id="map"></div>
          </div>
          <address>{{ site.data.contents.contact.address | markdownify }}</address>
        </div>
        <address>{{ site.data.contents.contact.detail | markdownify }}</address>
      </div> <!-- .col -->
      <div class="col-sm-1 col-md-1-2">
        <form class="no-print" id="cForm">
          <p><label>
            <input type="text" name="name" placeholder="Name">
          </label></p>
          <p><label>
            <input type="email" name="email" placeholder="Email (required)" required="required">
          </label></p>
          <p><label>
            <input type="text" name="job" placeholder="Job">
          </label></p>
          <p><label>
            <textarea type="textarea" name="msg" placeholder="Message (required)" required="required" rows="4"></textarea>
          </label></p>
          <p><label>
            <button type="submit">Send</button>
          </label></p>
        </form>
      </div> <!-- .col -->
    </div> <!-- .row --> <p/>
  </div>
</section>
</div>
<script>
afterLib.push(function () {
  // hero typing animation
  function mouseTrigger_HeroAni(e) {
    var data = {{ site.data.contents.anisequence | jsonify }};
    data = e.type=='mouseover' ? data.reverse() : data;
    function ani(el){
      if (stackOf_HeroAni && stackOf_HeroAni.length) {
        el.innerHTML = stackOf_HeroAni.pop();
        setTimeout(function(){ ani(el); },200);
      }
    }
    if (stackOf_HeroAni.length<1) {
      stackOf_HeroAni = data; ani(el);
    } else {
      stackOf_HeroAni = data.splice(0,stackOf_HeroAni.length);
    }
  }
  var stackOf_HeroAni = [], el = one('.hero .title span');
  el ? on(el, 'mouseover mouseout', mouseTrigger_HeroAni) : 0;
  // hero typing animation

  // parallax
  on(window, 'scroll resize', function (e){
    el ? el.style.top = Math.floor(getScroll().y/2)+'px' : 0;
  });
  // parallax
});
afterLib.push(function(){
  // apps icon clicked
  on(all('.sliding .modal-wrapper .close, .sliding a.ios-apps-icon'), 'click', function(e) {
    e.preventDefault();
    var dest = '#'+this.href.split('#')[1];
    var selected = this.parentNode;
    var tmp = (one('.sliding .modal-wrapper.open')) ? 800 : 0; // ease-slow(ms) + 100
    if (hasClass(this,'close') || hasClass(one(dest),'open')) {
      // ONCLOSE
      removeClass(all('.sliding .modal-wrapper'),'open');
      setTimeout(function(){
        removeClass(all('.sliding .ios-apps-list'),'active');
        removeClass(all('.sliding .ios-apps-list'),'blur');
      },tmp);
    }else{
      // ONOPEN
      if (!hasClass(one(dest),'open')) {
        removeClass(all('.sliding .modal-wrapper'),'open');
        removeClass(all('.sliding .ios-apps-list'),'active');
        addClass(all('.sliding .ios-apps-list'),'blur');

        setTimeout(function(){
          addClass(one(dest),'open');
        },tmp);
        addClass(selected,'active');
        removeClass(selected,'blur');

        // skip lazyload on this particular img
        tmp = one(dest + ' .gallery .ratio img.lazyload');
        if (tmp && tmp.dataset.src) {
          tmp.src = tmp.dataset.src;
          delete tmp.dataset.src;
          removeClass(tmp, 'lazyload');
        }
        // skip lazyload on this particular img
      }
    }
    return false;
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
});
afterLib.push(function () {
  var GEO = {{ site.data.contents.GEO | jsonify }},
  TOKEN_MAPBOX = {{ site.data.contents.TOKEN_MAPBOX | jsonify }},
  URL_GOOGLE_MAPS = {{ site.data.contents.URL_GOOGLE_MAPS | jsonify }},
  URL_SLACK_WEBHOOK = {{ site.data.contents.URL_SLACK_WEBHOOK | jsonify }},
  SUBMIT_RECENTLY = {
    show:1,
    header:'Ooops',
    body:'It looks like you already sent us a message (this is needed to prevent spam), but worry not, as soon as you close this message, you can sent me another message.'
  }, SUBMIT_SENDING = {
    show:1,
    header:'Sending Message',
    body:'Did you know, that your message is travelling via Internet to my slack channel in less than a second!'
  }, SUBMIT_INVALID = {
    show:1,
    header:'Invalid Response',
    body:'Invalid response from server, in case of emergency you can call my number.'
  }, SUBMIT_SENT = {
    show:1,
    header:'Message Sent',
    body:'Your message has been sent, please wait for the next reply.'
  }, SUBMIT_FAILED = {
    show:1,
    header:'Failed',
    body:'Unable to sent your message, probably network connection issue.'
  };

  // mapbox
  var isMapboxLoaded;
  function tryMapbox() { if (isMapboxLoaded || qs2obj().nomap) return;
    if (isElementInViewport(one('#map')) && window.mapboxgl) {
      mapboxgl.accessToken = TOKEN_MAPBOX;
      lnlt = [GEO.center.long, GEO.center.lat];
      map = new mapboxgl.Map({
        container: 'map',
        center: lnlt,
        zoom: GEO.center.zoom,
        attributionControl: false,
        logoPosition: 'bottom-right',
        style: 'mapbox://styles/mapbox/streets-v9'
      });
      marker = new mapboxgl.Marker().setLngLat(lnlt).addTo(map);
      on(one('.mapboxgl-marker'), 'click', function(e) {
        open(URL_GOOGLE_MAPS, '_blank').focus();
      }); isMapboxLoaded = 1;
    }
  } tryMapbox(); on(window, 'scroll resize', tryMapbox);
  // mapbox

  // contact form
  var recentlySubmitted, cForm = one('#cForm');
  function submitCForm(e) {
    e.preventDefault();
    if (recentlySubmitted) {
      modal.invoke(SUBMIT_RECENTLY,function() {
        removeClass(cForm, 'recently-submitted');
        recentlySubmitted = !1;
      });
    } else {
      modal.invoke(SUBMIT_SENDING);
      var el = e.target.elements;
      fetch(URL_SLACK_WEBHOOK, {
        method: "POST",
        body: JSON.stringify({
          "attachments": [{
            "fallback": "New message from — " + el.name.value + "\nJOB — " + el.job.value + "\nEMAIL — "+ el.email.value + "\nMessage — "+ el.msg.value,
            "color": "#36a64f",
            "pretext": "New message",
            "author_name": el.name.value,
            "author_link": "mailto:" + el.email.value + "",
            "author_icon": "https://www.gravatar.com/avatar/" + md5((el.email.value).trim().toLowerCase()),
            "title": "JOB — " + el.job.value + "",
            "title_link": "mailto:" + el.email.value+ "",
            "fields": [{
              "title": "Message",
              "value": el.msg.value,
              "short": false
            }],
            "text": "", "image_url": "", "thumb_url": "",
            "footer_icon": "https://slack.com/favicon.ico",
            "footer": location.href,
            "ts": Date.now()/1000
          }]
        }),
      }).then(function(response) {console.log(response);
        if (response.ok) {
          addClass(cForm, 'recently-submitted');
          cForm.reset();
          recentlySubmitted = !0;
          modal.invoke(SUBMIT_SENT);
        } else {
          modal.invoke(SUBMIT_INVALID);
        }
        return response.text()
      }, function(error) {console.log(error);
        modal.invoke(SUBMIT_FAILED);
      })
    }
    return false;
  } cForm ? on(cForm, 'submit', submitCForm) : 0 ;
  // contact form
});
</script>
