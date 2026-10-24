# GISTDA integration preparation (NOT DEPLOYABLE)

Status: documentation and isolated adapter only. Production Worker source has not been recovered. Do not merge or deploy this branch.

## Source-of-truth rules
- Retrieve official GISTDA endpoint, authentication header, response schema, dataset license and temporal coverage from approved API documentation. Do not guess.
- Rotate any API key previously exposed in chat. Never commit keys or tokens.
- Configure a Cloudflare Worker Secret named `GISTDA_API_KEY` in Cloudflare, not GitHub.
- Use the official observation date, satellite name, source identifier, and geometry metadata in the response. Do not infer observation dates from publication dates.
- Four requested windows (local dates, inclusive): 2026-09-21..30; 2026-10-01..10; 2026-10-11..20; 2026-10-21..24.
- If no verified observation exists in a window, show "no verified data", not an invented image or flood extent.
- Never show flooded-area totals without verified polygon data and an appropriate projected/equal-area calculation.
- Agriculture impact records are a separate dataset with their own cut-off dates; do not derive them from flood imagery.
- Preserve original Prachinburi dashboard code, storage and data unchanged.

## Before integration
1. Export/back up active Cloudflare Worker source and bindings.
2. Confirm official API endpoint, header, query parameters, data formats, licensing, and access rights.
3. Run adapter against a known non-secret test request; validate source, dates, CRS and geometry.
4. Integrate into a copy of the actual Worker source; test in isolated staging, then seek approval before deployment.

Reference: https://disaster.gistda.or.th/v2/services/open-api
