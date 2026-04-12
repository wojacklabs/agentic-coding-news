---
layout: default
title: Agentic Coding News
---

# Agentic Coding News

AI 에이전틱 코딩 관련 최신 뉴스를 3시간마다 자동 수집하여 발행합니다.

소스: X, Threads, Hacker News, Reddit, 기술 블로그 RSS

---

{% assign posts = site.pages | where_exp: "p", "p.path contains 'posts/'" | sort: "path" | reverse %}
{% for post in posts %}
- [{{ post.title | default: post.name }}]({{ post.url | relative_url }})
{% endfor %}
