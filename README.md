# Awesome Subscriptions

An open, community-maintained catalog of recurring services and subscription providers around the world.

The project is designed for subscription trackers, personal-finance apps, billing calendars, automations, and other products that need normalized service metadata without collecting private user data.

## Goals

- Maintain one canonical record per service.
- Describe regional availability without duplicating global services.
- Provide stable IDs, official domains, categories, billing-cycle hints, aliases, and account-management links.
- Keep prices out of the core catalog because they change frequently by plan, channel, promotion, tax, and country.
- Make the data easy to consume offline as JSON.
- Grow through reviewed community contributions.

## Initial scope

- 300 globally relevant services.
- 200 additional services relevant to Brazil.
- More country packs added incrementally.

The numbers above are coverage targets, not claims of market ranking. Inclusion should be supported by official availability and reasonable evidence of relevance in the region.

## Repository structure

```text
awesome-subscriptions/
├── data/
│   ├── categories.json
│   ├── countries/
│   └── services/
├── schema/
│   └── service.schema.json
├── scripts/
│   ├── build.mjs
│   └── validate.mjs
├── dist/                 # generated files
├── CONTRIBUTING.md
├── LICENSE
└── package.json
```

## Service record

```json
{
  "id": "netflix",
  "name": "Netflix",
  "domain": "netflix.com",
  "category": "streaming",
  "regions": ["BR", "US", "GB", "PT"],
  "billingCycles": ["monthly"],
  "aliases": ["NETFLIX.COM"],
  "websiteUrl": "https://www.netflix.com/",
  "managementUrl": "https://www.netflix.com/account",
  "status": "active",
  "verification": {
    "level": "official",
    "verifiedAt": "2026-07-20",
    "sources": ["https://www.netflix.com/"]
  }
}
```

See [`schema/service.schema.json`](schema/service.schema.json) for the canonical format.

## Data principles

1. **Catalog data is public; user data is not.** This repository contains service metadata only.
2. **No prices in the core record.** Apps should ask users for their actual amount.
3. **Official sources first.** Domains, availability, and management links should be checked against official pages.
4. **One service, one ID.** Regional availability belongs in `regions`; do not create duplicate country-specific records unless the products are genuinely distinct.
5. **Safe fallbacks.** Consumers should render a monogram or system icon when a logo is unavailable.
6. **Trademarks belong to their owners.** Inclusion does not imply affiliation or endorsement.

## Install and validate

```bash
npm install
npm run validate
npm run build
```

## Consuming the catalog

Generated files will be published under `dist/`:

- `dist/services.json` — all canonical services.
- `dist/countries/BR.json` — services available or especially relevant in Brazil.
- Other country files as coverage expands.

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before adding or editing a service.

## License

Code and structured metadata are released under the [MIT License](LICENSE). Brand names and trademarks remain the property of their respective owners.
