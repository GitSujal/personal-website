---
title: Forecasting a network that keeps rewiring itself
order: 3
result: 10-year POE10/POE50 forecasts
context: Western Power, 2025–26
stack: Snowflake, dbt (1,000+ models), Databricks Asset Bundles
also: team grown 1 → 3 engineers
---

Feeders move between zone substations all the time, so last year's load doesn't describe next year's network. With the network engineers, I built point-in-time snapshots of the topology and re-based history onto a frozen forecast topology. Rooftop solar, duck curve included, was modelled separately and layered back on, and data quality checks flagged any reading above what an asset can physically carry. Along the way I replaced manual UI work with Asset Bundles and CI/CD, and wrote the team's starter guide.
