# Contributing

Thanks for helping build a reliable, privacy-friendly catalog of recurring services.

## Before submitting

- Search existing records by ID, name, domain, and aliases.
- Confirm the service is active using at least one official source.
- Use the canonical global brand when the same service operates in several countries.
- Add ISO 3166-1 alpha-2 region codes only when availability has been reasonably confirmed.
- Do not add prices to the core service record.
- Do not upload third-party logos unless their license clearly allows redistribution.

## Adding a service

Create `data/services/<id>.json` and follow `schema/service.schema.json`.

ID rules:

- lowercase ASCII;
- words separated by hyphens;
- stable and based on the public product name;
- no country suffix unless it is genuinely a distinct product.

Example:

```json
{
  "id": "example-service",
  "name": "Example Service",
  "domain": "example.com",
  "category": "software",
  "regions": ["BR"],
  "billingCycles": ["monthly", "annual"],
  "aliases": ["EXAMPLE.COM"],
  "websiteUrl": "https://example.com/",
  "managementUrl": null,
  "cancellationUrl": null,
  "status": "active",
  "notes": null,
  "verification": {
    "level": "official",
    "verifiedAt": "2026-07-20",
    "sources": ["https://example.com/"]
  }
}
```

## Aliases

Aliases help apps match names found in statements, receipts, or emails. Add only public merchant descriptors that can be documented. Never add personal data, account numbers, card fragments, or user-submitted private text.

## Verification levels

- `official`: verified against an official product, help, pricing, availability, or account page.
- `editorial`: supported by reputable independent documentation when an official source is unavailable.
- `community`: plausible contribution awaiting stronger verification.

## Validation

```bash
npm install
npm run check
```

A contribution should not introduce duplicate IDs, duplicate domains, invalid categories, malformed region codes, or schema errors.

## Pull request checklist

- [ ] The filename matches the service ID.
- [ ] The official domain and URLs use HTTPS.
- [ ] Regional availability is not guessed.
- [ ] Sources are included.
- [ ] No prices or private user data are present.
- [ ] `npm run check` passes.

## Trademarks

Brand names and trademarks belong to their respective owners. Catalog inclusion is descriptive and does not imply affiliation, partnership, or endorsement.
