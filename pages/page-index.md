---
menu_index: 0
permalink: /
title: home
custom_header: true
redirect_from: /home
className: index
defer: |
  <link href="https://api.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.css" rel="stylesheet"/>
  <script async="" defer="" src="https://unpkg.com/nprogress@0.2.0"></script>
  <script async="" defer="" src="https://unpkg.com/smooth-scroll@16.0.0"></script>
  <script async="" defer="" src="https://unpkg.com/gumshoejs@5.0.1"></script>
  <script async="" defer="" src="https://unpkg.com/blueimp-md5@2.10.0/js/md5.min.js"></script>
  <script async="" defer="" src="https://api.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.js"></script>
  <style>
  .index-gradient {
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSI0NSUiIHN0b3AtY29sb3I9IiMzMzMzMzMiIHN0b3Atb3BhY2l0eT0iMSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmZmZmZmIiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InVybCgjZ3JhZC11Y2dnLWdlbmVyYXRlZCkiIC8+Cjwvc3ZnPg==);
    background: -moz-linear-gradient(top,  rgba(51,51,51,1) 45%, rgba(255,255,255,0) 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(45%,rgba(51,51,51,1)), color-stop(100%,rgba(255,255,255,0)));
    background: -webkit-linear-gradient(top,  rgba(51,51,51,1) 45%,rgba(255,255,255,0) 100%);
    background: -o-linear-gradient(top,  rgba(51,51,51,1) 45%,rgba(255,255,255,0) 100%);
    background: -ms-linear-gradient(top,  rgba(51,51,51,1) 45%,rgba(255,255,255,0) 100%);
    background: linear-gradient(to bottom,  rgba(51,51,51,1) 45%,rgba(255,255,255,0) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#333333", endColorstr="#00ffffff",GradientType=0 );
  }
  </style>
blank_gif: data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7
---

<!-- markdownlint-disable MD033 -->

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
<div class="index-gradient">
<section id="me">
  <div class="hero"><div class="ratio ease"><div>
    <img src="{{ page.blank_gif }}" class="lazyload cover" alt="Cover image" data-src="{{ "/assets/images/cover.jpg" | absolute_url }}"/>
    <h1 class="title"><span class="ease font-monospace">ME.SELF</span></h1>
  </div></div></div>
  <div class="container"> {{ site.data.contents.about.text | markdownify }}</div>
  <div class="container quote"> {{ site.data.contents.about.quote | markdownify }} </div>
</section>
<section id="project">
  <div class="container">
    <p><h2>project-list</h2><small>(tap icon apps to see detail)</small><br/></p><br/>
    <div class="popup-modalx sliding">
    <div class="row">
      {% for project in site.data.projects %}
      <div class="col-sm-1-3 col-md-1-6 app-list align-center ease project-{{ project.id }}">
        <a class="app-icon" href="#project-{{ project.id }}">
          <img src="{{ page.blank_gif }}" class="lazyload app-icon" alt="App icon" data-src="{{ project.icon }}"/>
          <span class="screen-reader">🔗 open</span>
        </a>
        <div class="app-name">{{ project.name }}</div>
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
        {% if project.ios-store or project.and-store or project.link %}
        <p class="apps-marketing">
          {% if project.ios-store %}
          <a class="ios-btn" target="_blank" href="{{ project.ios-store }}">
            <img src="{{ page.blank_gif }}" class="lazyload" data-src="{{ "/assets/images/logo_apps/badge-ios.svg" | absolute_url }}"/>
          </a>
          {% endif %}
          {% if project.and-store %}
          <a class="and-btn" target="_blank" href="{{ project.and-store }}">
            <img src="{{ page.blank_gif }}" class="lazyload" data-src="{{ "/assets/images/logo_apps/badge-and.png" | absolute_url }}"/>
          </a>
          {% endif %}
          {% if project.link %}
          <a target="_blank" href="{{ project.link }}" style="color: #87FBB9;">
            {{ project.link }}
          </a>
          {% endif %}
        </p>
        {% endif %}
        <div class="row clear">
          <div class="col-sm-1 col-md-1-2">
            <div class="gallery" data-img='{{ project.gallery | jsonify }}'>
              <div class="ratio ratio-9-16 checkered">
                <img src="{{ page.blank_gif }}" class="lazyload ease unload" alt="Gallery image" data-src="{{ project.gallery[0] }}"/>
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
      </div>
      <div class="col-sm-1 col-md-1-2">
        <!-- form class="no-print" id="cForm">
          <p><label>  <input type="text" name="name" placeholder="Name">
          </label></p>
          <p><label>  <input type="email" name="email" placeholder="Email (required)" required="required">
          </label></p>
          <p><label>  <input type="text" name="job" placeholder="Job">
          </label></p>
          <p><label>  <textarea type="textarea" name="msg" placeholder="Message (required)" required="required" rows="4"></textarea>
          </label></p>
          <p><label>  <button type="submit">Send</button>
          </label></p>
        </form> -->
          <div class="embed-container">
            <iframe
                src="https://www.youtube.com/embed/-340ucBEHx0?autoplay=1"
                width="350"
                height="240"
                frameborder="0"
                allowfullscreen=""
                allow='autoplay'>
            </iframe>
          </div>
          <p>
            Latest share knowledge from yoseph.ws
            <br/>
            Feel free to visits <a href="https://curcifer.tech/blog/" style="color: #87FBB9;"> Curcifer Tech </a> for more detail
        </p>
      </div>
    </div> <!-- .row --> <p/>
  </div>
</section>
</div>
<script>
window.anisequence = {{ site.data.contents.anisequence | jsonify }};
window.GEO = {{ site.data.contents.GEO | jsonify }};
window.TOKEN_MAPBOX = {{ site.data.contents.TOKEN_MAPBOX | jsonify }};
window.URL_GOOGLE_MAPS = {{ site.data.contents.URL_GOOGLE_MAPS | jsonify }};
window.URL_SLACK_WEBHOOK = {{ site.data.slack_secrets.URL_SLACK_WEBHOOK | jsonify }};
</script>
<script async="" defer="" src="{{ "/assets/js/page-index.js" | absolute_url }}"></script>
