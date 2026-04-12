---
layout: default
title: Agentic Coding News
---

# Latest

{% assign posts = site.pages | where_exp: "p", "p.path contains 'posts/'" | sort: "path" | reverse %}
{% for post in posts %}
<nav class="posts-list">
<a href="{{ post.url | relative_url }}">{{ post.title | default: post.name }}<span>&rarr;</span></a>
</nav>
{% endfor %}
