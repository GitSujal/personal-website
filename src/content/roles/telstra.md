---
title: Resident Platform Engineer
org: Hypersec (deployed at Telstra)
location: Perth, WA
start: '2024-04'
end: '2025-09'
kind: work
tags: [Kafka (AWS MSK), Kubernetes, ClickHouse, OpenSearch, Vector, Security, AI Agents]
---

- **Embedded at Telstra as Hypersec's resident engineer, owning the full product lifecycle on site:** deploying, upgrading and supporting the platform inside Telstra's own secured environment, gathering requirements from Telstra stakeholders and co-developing features with the product team, then shipping each release into production. Owned live support against SLA targets, leading on-call incident response and root-cause analysis, and writing SOPs to prevent data loss and speed up recovery.
- **Re-architected a streaming ingestion platform, cutting compute costs by over 50% (saving >$600K annually),** while processing over 1 TB/hour of critical security telemetry on AWS MSK (Kafka). Decoupled I/O-bound and CPU-bound workloads, tuned Kafka components, added event-based Kubernetes scaling and built near-real-time Vector pipelines routing denoised logs to ClickHouse and OpenSearch, then shipped it into Telstra's production environment as a major release with no loss of reliability.
- **Delivered within a strict enterprise security environment,** enforcing VPC network isolation, mandatory TLS, SASL/SCRAM authentication and OAuth2-secured management APIs. Built Python tooling and REST APIs that cut secure pipeline creation from days to hours.
- **Built a warehouse-agnostic data platform with secure AI agent access,** exposing APIs and pipeline metadata so AI agents could query enterprise data and generate analytical reports. Standardised ingestion on a Medallion architecture, cutting new-source onboarding time by 60%.
