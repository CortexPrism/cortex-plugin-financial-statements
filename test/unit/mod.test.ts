// deno-lint-ignore-file require-await
import { assertEquals, assertStringIncludes } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { tools } from '../../mod.ts';
import type { PluginContext } from 'cortex/plugins';

const ctx: PluginContext = {
  pluginId: 'cortex-plugin-financial-statements',
  pluginDir: '/tmp/fs',
  state: { get: async () => null, set: async () => {} },
  config: {},
  logger: { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} },
};
const find = (n: string) => tools.find((t) => t.definition.name === n)!;

Deno.test('fs_get_profit_loss — returns P&L', async () => {
  const r = await find('fs_get_profit_loss').execute({
    platform: 'quickbooks',
    start_date: '2026-01-01',
    end_date: '2026-06-30',
  }, ctx);
  assertEquals(r.success, true);
  assertStringIncludes(r.output, 'net_income');
});

Deno.test('fs_get_balance_sheet — returns balance sheet', async () => {
  const r = await find('fs_get_balance_sheet').execute({
    platform: 'xero',
    as_of_date: '2026-06-19',
  }, ctx);
  assertEquals(r.success, true);
  assertStringIncludes(r.output, 'total_assets');
});

Deno.test('fs_get_cash_flow — returns cash flow', async () => {
  const r = await find('fs_get_cash_flow').execute({
    platform: 'quickbooks',
    start_date: '2026-01-01',
    end_date: '2026-06-30',
    method: 'indirect',
  }, ctx);
  assertEquals(r.success, true);
  assertStringIncludes(r.output, 'operating_cash_flow');
});

Deno.test('fs_get_variance — flags anomalies', async () => {
  const r = await find('fs_get_variance').execute(
    { platform: 'quickbooks', period: '2026-Q2' },
    ctx,
  );
  assertEquals(r.success, true);
  assertStringIncludes(r.output, 'flag');
});

Deno.test('fs_list_accounts — lists accounts', async () => {
  const r = await find('fs_list_accounts').execute(
    { platform: 'xero', account_type: 'asset' },
    ctx,
  );
  assertEquals(r.success, true);
  assertStringIncludes(r.output, 'Checking');
});

Deno.test('fs_analyze_transactions — finds anomalies', async () => {
  const r = await find('fs_analyze_transactions').execute({
    platform: 'quickbooks',
    start_date: '2026-06-01',
    end_date: '2026-06-19',
  }, ctx);
  assertEquals(r.success, true);
  assertStringIncludes(r.output, 'anomalies');
});

Deno.test('rejects invalid platform', async () => {
  const r = await find('fs_get_profit_loss').execute({
    platform: 'invalid',
    start_date: '2026-01-01',
    end_date: '2026-06-30',
  }, ctx);
  assertEquals(r.success, false);
});

Deno.test('tools array — has 6 tools', () => {
  assertEquals(tools.length, 6);
});
