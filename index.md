---
layout: default
title: Agentic Coding News
---

# Latest

{% assign all_posts = site.pages | where_exp: "p", "p.path contains 'posts/'" | sort: "path" | reverse %}
{% for post in all_posts %}{% assign relative = post.path | remove: "posts/" %}{% unless relative contains "/" %}
<a class="date-card" href="{{ post.url | relative_url }}">
<span class="date-label">{{ post.title | default: post.name }}</span>
<span class="date-arrow">&rarr;</span>
</a>
{% endunless %}{% endfor %}
