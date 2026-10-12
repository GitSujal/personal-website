---
title: Halving the cost of a terabyte an hour
order: 1
result: −50% compute · $600K+/yr
context: Telstra, 2024–26
stack: Kubernetes, ClickHouse, OpenSearch
also: provisioning APIs, days → hours
---

Telstra's log platform ingested over 1 TB/hr into ClickHouse and OpenSearch. I split IO-bound from CPU-bound work, parallelised onto idle cores, and made Kubernetes scale on events instead of guesses. Compute cost fell by half, and latency and reliability held.
