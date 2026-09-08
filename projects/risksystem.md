---
title: "RiskSystem"
description: "A project hosted on GitHub. Visit the repository for full details."
techStack:
  - "Python"
github: "https://github.com/MishaSaifuddin/RiskSystem"
date: "2026-08-21"
---

## Overview

A project hosted on GitHub. Visit the repository for full details.

## Repository

View the source code: [MishaSaifuddin/RiskSystem](https://github.com/MishaSaifuddin/RiskSystem)

- **Language**: Python
- **Stars**: 1
- **Forks**: 0
- **Updated**: 2026-08-24


---

A lightweight, zero-dependency risk management system for identifying, assessing, tracking, exporting and auditing risks. Includes a CLI, a web UI with a REST API, and CSV/Excel export.

![Python](https://img.shields.io/badge/python-3.10%2B-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen) ![Tests](https://img.shields.io/badge/tests-30%20passing-success)

## Features

- Risk register with CRUD operations
- 5x5 scoring matrix: `score = probability x impact` (each rated 1-5)
- Automatic levels: low (1-4), medium (5-9), high (10-14), critical (15-25)
- Statuses: open, mitigating, mitigated, accepted, closed
- Filtering by level, status, category + text search; sorted by severity
- Portfolio summary report (counts by level/status, average score, top open risk)
- Audit log: every create/update/delete recorded with field-level diffs
- Export to CSV and Excel (.xlsx) - no external libraries needed
- Web UI (single-page app) + JSON REST API served from the standard library
- Dashboard landing page: 5x5 risk heatmap + monthly trend chart, auto-regenerated
  from the risk register after every change
- Authentication with roles: **admin** manages everything, **viewer** is read-only
  (PBKDF2-hashed passwords, HttpOnly session cookies, login rate limiting)

## Layout

```
risk_system/
  models.py    # Risk dataclass, enums, scoring
  storage.py   # JSON persistence (atomic writes)
  history.py   # Audit log storage
  engine.py    # RiskSystem core logic + audit integration
  export.py    # CSV / XLSX writers
  web.py       # HTTP server, REST API, embedded web UI
  cli.py       # Command-line interface
tests/
```

## Quick start

```bash
python -m risk_system.cli add "Payment gateway outage" -c operations -p 3 -i 5 -o alice -m "Failover to secondary provider"
python -m risk_system.cli list --level critical
python -m risk_system.cli report
```

## Web UI & API

```bash
python -m risk_system.cli serve            # http://127.0.0.1:8000
python -m risk_system.cli serve --port 9000
```

Open the URL in a browser. The landing page is the **Dashboard**:

- Summary cards (total, counts by level, average score)
- **Risk heatmap** - 5x5 probability x impact matrix with live risk counts per cell,
  colored by severity; click any cell to jump into the register filtered by that P/I pair
- **Risks per month** - bar chart of new risks over the last 12 months with a line for
  resolved (mitigated/closed) risks

Both regenerate automatically from the register whenever a risk is added, updated or deleted.
The **Risk Register** tab has search/filters, inline status changes, add/edit/delete dialogs,
per-risk history and the full audit log.

REST API endpoints:

| Method | Path                  | Description                          |
|--------|-----------------------|--------------------------------------|
| GET    | /api/risks            | List risks (`?level=&status=&category=&q=`) |
| POST   | /api/risks            | Create risk (JSON body)              |
| GET    | /api/risks/{id}       | Get one risk                         |
| PATCH  | /api/risks/{id}       | Update fields                        |
| DELETE | /api/risks/{id}       | Delete risk                          |
| GET    | /api/summary          | Portfolio summary                    |
| GET    | /api/dashboard        | Heatmap matrix + monthly buckets     |
| GET    | /api/history          | Audit log (`?risk_id=` to filter)    |
| GET    | /api/export?format=   | Download csv or xlsx                 |

## CLI reference

```bash
python -m risk_system.cli add <title> [-d desc] [-c category] [-p 1-5] [-i 1-5] [-o owner] [-m mitigation]
python -m risk_system.cli list [--level L] [--status S] [--category C] [-s search]
python -m risk_system.cli show <id>
python -m risk_system.cli update <id> [--title T] [-p 1-5] [-i 1-5] [--status S] [-o owner] [-m mitigation]
python -m risk_system.cli delete <id>
python -m risk_system.cli report
python -m risk_system.cli history [id]
python -m risk_system.cli export [--format csv|xlsx] [--out file] [--level L] [--status S] [--category C] [-s search]
python -m risk_system.cli serve [--host H] [--port P]
```

All commands accept `--store path.json` to choose the data file (audit log is stored
alongside it as `<name>_history.json`).

## Library usage

```python
from risk_system import RiskSystem, JsonStorage

system = RiskSystem(JsonStorage("risks.json"))
risk = system.add_risk("Data breach", category="security", probability=3, impact=5)
print(risk.score, risk.level.value)   # 15 critical

system.update_risk(risk.id, status="mitigating", mitigation="Rotate keys, patch WAF")
print(system.summary())
print([e.action for e in system.get_history()])   # ['created', 'updated']

from risk_system import export_csv, export_xlsx
export_xlsx(system.list_risks(), "risks.xlsx")
```

## Authentication & roles

| Account | Password   | Role  | Access                                            |
|---------|------------|-------|---------------------------------------------------|
| admin   | admin123   | admin | Full control: create/edit/delete risks, audit log, exports |
| viewer  | viewer123  | user  | Read-only: dashboard + register views              |

Both accounts are auto-created on first `serve` if no users exist.
**Change the admin password before exposing anything publicly:**

```bash
python -m risk_system.cli adduser misha --role admin          # prompts for password
python -m risk_system.cli listusers                           # inspect accounts
```

On Render, set `RISKSYSTEM_ADMIN_USER` / `RISKSYSTEM_ADMIN_PASSWORD` environment variables
(the blueprint already declares them).

Security features:

- Passwords stored as PBKDF2-HMAC-SHA256 hashes (120k iterations, per-user salt), timing-safe comparison
- Server-side sessions with 8h expiry; cookies are HttpOnly + SameSite=Lax (+ Secure behind HTTPS)
- Login rate limiting: 5 failed attempts per IP triggers a 15-minute lockout
- Role checks enforced server-side on every mutating endpoint (403 for viewers)
- Audit log records *who* made every change
- Hardened response headers: nosniff, DENY framing, no-referrer, no-store

## Demo data

```bash
python seed_demo.py        # generates 36 realistic risks spread over 12 months
```

## Public hosting

```bash
python -m risk_system.cli serve --host 0.0.0.0 --port 8000   # LAN / container binding
```

Note: the app has no authentication by design (demo/portfolio project). For a public URL,
prefer a tunnel (`cloudflared tunnel --url http://localhost:8000` or `ngrok http 8000`)
or a free PaaS deploy rather than open port forwarding.

## Log in on the live site
- Username: admin
- Password: admin123
- Viewer demo account: viewer / viewer123

## Tests

[https://risksystem.onrender.com/login]

```bash
python -m unittest discover -s tests
```