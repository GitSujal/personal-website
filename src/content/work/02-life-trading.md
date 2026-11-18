---
title: Backtests in minutes, with no warehouse left running
order: 2
result: 'backtests: hours → minutes'
context: Life Trading, 2026–
stack: DuckDB, DuckLake, Parquet, SeaweedFS, Patroni
also: multi-TB, fully self-hosted
---

Strategy research at Life Trading runs on a multi-TB time-series platform I own end to end. It's a serverless-first DuckLake lakehouse: storage and compute are separate, so DuckDB queries spin up on demand against open Parquet files and nothing sits idle on the bill. Underneath it, S3-compatible storage on SeaweedFS and a highly available PostgreSQL catalog under Patroni give cloud-grade durability and automatic failover, without managed-service prices.
