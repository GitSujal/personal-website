# Sujal Dhungana

Data Engineer · Platform Engineer · Forward Deployed Engineer

Perth, Western Australia · sujal@datasparta.com · linkedin.com/in/dhunganasujal · sujal.datasparta.com

## Summary

Senior data and platform engineer who builds large-scale distributed systems and AI-ready data platforms for people and AI agents. Most of my work has been taking ideas from prototype to production, often forward deployed alongside the people who'll use them: streaming platforms handling a terabyte an hour, a serverless multi-TB lakehouse, fully automated MLOps pipelines and secure data APIs for AI agents. I keep things simple, define everything as code, and own what I build, from requirement analysis through to supporting it in production.

## Skills

- **Key skills:** AI-ready data platforms, distributed systems, event-driven architecture, data engineering, DataOps, data infrastructure, data modelling, data warehousing
- **Languages:** Python, SQL, PySpark, Bash, JavaScript
- **Platforms & orchestration:** AWS (Lambda, Step Functions, EKS, ECS, SageMaker), Kubernetes, Databricks, ArgoCD, Helm
- **Processing & warehousing:** Kafka (AWS MSK), dbt, Snowflake, DuckDB, DuckLake, ClickHouse, Apache Iceberg, AWS Glue, OpenSearch, DynamoDB, RDS
- **GitOps & IaC:** Terraform, CDK, CloudFormation, Databricks Asset Bundles, CI/CD, GitLab, Azure DevOps
- **Observability:** Prometheus, Grafana

## Experience

### Data Infrastructure Engineer · Life Trading Pty Ltd
*June 2026 – Present · Perth, WA*

- **Owned the platform end to end, from architecture to production,** designing, building and operating a multi-TB time-series data platform for backtesting trading strategies. Cut backtest run times from hours to minutes, enabling much faster iteration on strategy research.
- **Applied a serverless-first approach through a DuckLake lakehouse architecture,** separating storage from compute so DuckDB queries run on demand against open Parquet files, with no always-on warehouse to pay for. Kept the platform cost-effective at multi-TB scale.
- **Self-hosted and operated the full infrastructure stack in-house,** including S3-compatible object storage on SeaweedFS and a highly available PostgreSQL cluster managed with Patroni as the lakehouse catalog, delivering cloud-grade durability and automatic failover without managed-service costs.

### Senior Data Engineer · Western Power
*September 2025 – June 2026 · Perth, WA*

- **Worked closely with network engineers to model a constantly changing network topology,** building point-in-time snapshots of feeder-to-zone-substation relationships and re-basing historical load onto a frozen forecast topology, so each substation’s history reflected its current configuration and planned future transfers.
- **Delivered 10-year POE10 and POE50 peak demand and energy forecasts** on Snowflake, backed by 1,000+ dbt models. Modelled rooftop solar separately and layered its impact, including duck-curve behaviour, onto underlying demand, alongside known bulk loads coming online or offline.
- **Built data quality checks grounded in asset physical limits,** onboarding asset rating data to flag any reading above what an asset can physically carry, and standardised mixed 5-minute and 30-minute meter readings into consistent 30-minute peaks using a top-3 averaging method.
- **Championed everything-as-code and grew the team from 1 to 3 engineers,** replacing manual UI development with Databricks Asset Bundles and CI/CD, and authoring the team’s Data Engineering Starter Guide and supporting tooling.

### Resident Platform Engineer · Hypersec (deployed at Telstra)
*April 2024 – September 2025 · Perth, WA*

- **Embedded at Telstra as Hypersec’s resident engineer, owning the full product lifecycle on site:** deploying, upgrading and supporting the platform inside Telstra’s own secured environment, gathering requirements from Telstra stakeholders and co-developing features with the product team, then shipping each release into production. Owned live support against SLA targets, leading on-call incident response and root-cause analysis, and writing SOPs to prevent data loss and speed up recovery.
- **Re-architected a streaming ingestion platform, cutting compute costs by over 50% (saving &gt;$600K annually),** while processing over 1 TB/hour of critical security telemetry on AWS MSK (Kafka). Decoupled I/O-bound and CPU-bound workloads, tuned Kafka components, added event-based Kubernetes scaling and built near-real-time Vector pipelines routing denoised logs to ClickHouse and OpenSearch, then shipped it into Telstra’s production environment as a major release with no loss of reliability.
- **Delivered within a strict enterprise security environment,** enforcing VPC network isolation, mandatory TLS, SASL/SCRAM authentication and OAuth2-secured management APIs. Built Python tooling and REST APIs that cut secure pipeline creation from days to hours.
- **Built a warehouse-agnostic data platform with secure AI agent access,** exposing APIs and pipeline metadata so AI agents could query enterprise data and generate analytical reports. Standardised ingestion on a Medallion architecture, cutting new-source onboarding time by 60%.

### Founder · Data Sparta Pty Ltd
*August 2023 – Present · Perth, WA*

- **Built data platforms for small and medium businesses,** owning each engagement end to end, from discovery with stakeholders through to delivery and support. Clients include a leading Australian horse auctioneer (unified data platform, recommendation engine and automated sale reporting) and state sporting organisations (third-party system integrations, Medallion-architecture platforms, self-service analytics and secure AI agent access).
- **Founded and taught a 12-week data analytics bootcamp through Data Profession Academy,** Data Sparta’s training arm, teaching Python, advanced SQL and data modelling to 20+ students. Mentored the cohort through technical projects, with most securing their first industry data roles within 3 months.

### Senior Data Engineer · Water Corporation
*May 2022 – April 2024 · Perth, WA*

- **Took an award-winning predictive model (OzWater 2024 top paper) from prototype to live operations,** using real-time SCADA data from treatment-plant centrifuges (rotational speed, intake flow, temperature and other process variables) to predict the moisture content of the separated output. Built the automated MLOps pipeline (SageMaker, Step Functions, CodeBuild), cutting deployment time from days to minutes under strict cross-account governance.
- **Delivered the data product behind objective risk assessments of $2.3B in physical assets,** building large-scale PySpark pipelines in AWS Glue that combined high-volume PI telemetry, GIS and SQL Server data, with data quality checks that validated every reading against the asset’s physical operating limits. Replaced manual validation with automated tests, cutting QA from days to hours.

### Technology Consultant · Visagio
*August 2020 – May 2022 · Perth, WA*

- **Identified and resolved absenteeism worth $40M annually for BHP,** combining time and attendance data analysis with site visits to understand how workers actually accessed site. Built a tool that matched access patterns against rosters and leave records, flagging absences so supervisors could reconcile them as leave.
- **Built a strategic scenario-modelling engine** generating 5- and 10-year workforce projections from complex demographic data to support long-term resource planning.

## Education

### Master of Predictive Analytics
*Curtin University · Perth, WA · 2020*
Minor in Finance and Investment. GPA 8.0/10 (High Distinction).

### B.E. Electronics & Communications
*Tribhuvan University · Kathmandu, Nepal · 2017*
GPA 8.0/10 (High Distinction). Telecommunications and embedded systems.

## Involvement

### Speaker & Workshop Host
*Perth Data Engineering Meetup · Google Developer Group (GDG) Perth*
Spoke at the Perth Data Engineering Meetup on building reusable pipelines and at GDG Perth on embedding AI tools into everyday engineering workflows. Ran webinars and one-day workshops teaching data engineering and analytics fundamentals to the wider tech community.
