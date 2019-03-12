---
menu_index: 2
permalink: /posts/
title: posts
---

# posts

{% for post in site.posts %}

<div>
  <h2><a class="post-link" href="{{ post.url | absolute_url }}">
    {{ post.title | escape }}
  </a></h2>
  <small class="post-meta">
    {{ post.date | date: "%b %-d, %Y" }}
  </small>
</div>
{% endfor %}
<p>
  subscribe <a class="rss-link" href="{{ "/feed.xml" | absolute_url }}">via RSS</a>
</p>
