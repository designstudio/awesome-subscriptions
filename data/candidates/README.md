# Catalog candidates

This directory contains discovery lists that have not yet been promoted to canonical service records.

Candidate files are intentionally separate from `data/services/` so the project never presents unverified availability, billing cycles, aliases, management URLs, or cancellation URLs as facts.

## Statuses

- `candidate`: identified as potentially relevant and awaiting review;
- `reviewing`: domain, category, regions, and official source are being checked;
- `approved`: ready to be converted into a canonical record;
- `rejected`: duplicate, irrelevant, discontinued, or otherwise unsuitable.

## Promotion checklist

Before moving a candidate into `data/services/<id>.json`:

1. Confirm the canonical product name and official domain.
2. Confirm that a recurring paid offering currently exists.
3. Confirm regional availability using an official source.
4. Add supported billing-cycle hints without guessing.
5. Add only aliases backed by invoices, receipts, or reliable reports.
6. Add official management or cancellation URLs when available.
7. Set `verification.level` honestly.
8. Run `npm run validate` and `npm run build`.

Candidates are discovery metadata, not the public API contract. Consumers should use files generated from canonical records in `dist/`.
