---
title: Data Infrastructure Engineer
org: Life Trading Pty Ltd
location: Perth, WA
start: '2026-06'
kind: work
current: true
summary: Own the multi-TB timeseries platform behind trading-strategy backtests, end to end. A serverless-first DuckLake lakehouse on self-hosted infrastructure, with backtests down from hours to minutes.
tags: [DuckDB, DuckLake, Parquet, SeaweedFS, PostgreSQL, Patroni]
---

- **Owned the platform end to end, from architecture to production,** designing, building and operating a multi-TB time-series data platform for backtesting trading strategies. Cut backtest run times from hours to minutes, enabling much faster iteration on strategy research.
- **Applied a serverless-first approach through a DuckLake lakehouse architecture,** separating storage from compute so DuckDB queries run on demand against open Parquet files, with no always-on warehouse to pay for. Kept the platform cost-effective at multi-TB scale.
- **Self-hosted and operated the full infrastructure stack in-house,** including S3-compatible object storage on SeaweedFS and a highly available PostgreSQL cluster managed with Patroni as the lakehouse catalog, delivering cloud-grade durability and automatic failover without managed-service costs.
