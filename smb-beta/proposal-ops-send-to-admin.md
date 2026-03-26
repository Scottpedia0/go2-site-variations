Send this to the person who handles setup if the operator should not have to touch technical configuration.

```text
Please set up the starter stack from this Go2 x Cowork.ai proposal-ops audit example for the operator on this machine.

Assets:
- Browser tool: /Users/scottmoran/brain/projects/go2-audit-product/proposal-response-pack-builder.html
- Connector starter: https://github.com/Scottpedia0/outlook-pipedrive-mcp
- Connector install prompt: /Users/scottmoran/brain/projects/go2-audit-product/outlook-pipedrive-mcp/INSTALL_WITH_CODEX.md

What I need you to do:
1. Connect Outlook and the CRM to the connector starter.
2. Generate the local setup block for Codex or Claude Code.
3. Ask only for the credentials or field mappings you truly need.
4. Run one real test that:
   - reads recent sent follow-ups from Outlook
   - matches people in the CRM by email
   - writes one note and one follow-up task
5. If any email cannot be matched, leave it in a review list instead of dropping it.

What I need back:
- one working setup block
- the env vars or credentials checklist
- one successful test result or the exact blocker
- the next Monday test the operator should run

Goal:
The operator should not have to learn the tooling. They should be able to copy a messy request into the browser tool, get a clean internal brief and customer reply, and have follow-ups start writing back into the CRM.
```
