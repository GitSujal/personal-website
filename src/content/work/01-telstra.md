---
title: Halving the cost of a terabyte an hour
order: 1
result: −50% compute · $600K+/yr
context: Hypersec at Telstra, 2024–25
stack: Kafka (AWS MSK), Kubernetes, Vector, ClickHouse, OpenSearch
also: secure pipeline creation, days → hours
---

As Hypersec's resident engineer inside Telstra, I re-architected a streaming platform carrying over 1 TB an hour of critical security telemetry through Kafka. I split I/O-bound from CPU-bound work, tuned Kafka, made Kubernetes scale on events, and built Vector pipelines routing denoised logs to ClickHouse and OpenSearch. Compute cost fell by more than half, and it shipped to production as a major release with no loss of reliability, inside an environment of VPC isolation, mandatory TLS and SASL/SCRAM.
