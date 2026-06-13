# Security Policy

## Supported Versions

This project currently supports security fixes for the active release line and the main development branch.

| Version                         | Supported          |
| ------------------------------- | ------------------ |
| `main` / unreleased development | :white_check_mark: |
| Latest published release line   | :white_check_mark: |
| Older release lines             | :x:                |

If a critical issue affects an older release, we may backport a fix at our discretion, but support is not guaranteed.

## Reporting a Vulnerability

Please report security issues privately through the repository’s GitHub Security Advisory workflow. Do not open a public issue for a vulnerability unless you have already coordinated a disclosure with the maintainers.

Include as much detail as possible, such as:

- A short description of the issue and its potential impact
- Exact steps to reproduce
- Affected pages, components, or data flows
- Screenshots, proof-of-concept code, or logs if available
- Whether the issue affects the React app, the Jekyll docs site, or both

We aim to acknowledge reports within 2 business days and provide a status update within 7 business days. Complex reports may take longer while we reproduce, validate impact, and prepare a fix.

If the report is accepted, we will work with the reporter on a remediation plan and coordinate a disclosure timeline before publishing details. If the report is declined, we will explain the reasoning when possible, such as if the issue is out of scope, not reproducible, or limited to an unsupported version.

## Scope

The app is primarily client-side and stores user data in browser `localStorage`. Security reports should focus on issues that could lead to unauthorized data access, script injection, unsafe data handling, dependency vulnerabilities, build or deployment misconfiguration, or exposure through the documentation site.

Do not include secrets, tokens, or personal data in reports unless strictly necessary to demonstrate the issue.
