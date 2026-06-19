# Financial Statement Generator

Accounting plugin for CortexPrism — QuickBooks, Xero, and FreshBooks integration for P&L, balance
sheet, cash flow, and variance analysis.

## Installation

```bash
cortex plugin install github:CortexPrism/cortex-plugin-financial-statements
```

## Tools

| Tool                      | Description                                                   |
| ------------------------- | ------------------------------------------------------------- |
| `fs_get_profit_loss`      | Generate P&L statement with revenue, COGS, expenses breakdown |
| `fs_get_balance_sheet`    | Generate balance sheet with assets, liabilities, equity       |
| `fs_get_cash_flow`        | Generate cash flow statement (direct/indirect method)         |
| `fs_get_variance`         | Budget vs Actual variance analysis with anomaly flagging      |
| `fs_list_accounts`        | List chart of accounts with balances                          |
| `fs_analyze_transactions` | Transaction trend analysis and anomaly detection              |

## Configuration

```json
{
  "plugins": {
    "cortex-plugin-financial-statements": {
      "quickbooksClientId": "your-client-id",
      "quickbooksClientSecret": "your-client-secret",
      "quickbooksRealmId": "your-realm-id",
      "xeroClientId": "your-xero-client-id",
      "xeroClientSecret": "your-xero-client-secret"
    }
  }
}
```

## Supported Platforms

- **QuickBooks** — OAuth2
- **Xero** — OAuth2
- **FreshBooks** — OAuth2

## License

MIT
