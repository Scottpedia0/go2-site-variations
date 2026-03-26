Paste this into Codex or Claude Code if your job looks like proposal ops, sales ops, recruiting ops, or any inbox-to-pipeline operator role.

If you are non-technical and someone else handles setup, send them this instead:
- `/Users/scottmoran/brain/projects/go2-audit-product/proposal-ops-send-to-admin.md`

```text
Install the starter stack from this Go2 x Cowork.ai proposal-ops audit example.

Use these assets:
- Browser tool: ./proposal-response-pack-builder.html
- Connector starter: https://github.com/Scottpedia0/outlook-pipedrive-mcp
- Connector sample output: ./outlook-pipedrive-mcp/sample-sync-output.json

What to do:
1. Install the Outlook -> CRM connector starter and generate the right local paste-in setup block for this machine.
2. Ask only for the credentials or field mappings you truly need.
3. Create these three starter workflows around the operator's real tools:
   - proposal_intake_brief
   - promise_lag_sentry
   - pricing_sheet_guardrail
4. Make one raw inbound request produce:
   - an internal brief
   - a customer-safe reply draft
   - a Slack or CRM handoff
5. Keep human approval on pricing, scope, and send.
6. Run one real inbox -> CRM writeback test.
7. If writeback fails, show the exact failing step, the exact error, and the smallest next fix.

Output:
- installed paste-in setup block
- env var checklist
- missing field mappings, if any
- first successful test run or exact blocker
- the next Monday test the operator should run

Do not explain the plumbing unless asked. Prefer a working install over a long explanation.
```
