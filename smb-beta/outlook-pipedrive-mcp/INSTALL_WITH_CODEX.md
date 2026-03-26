Paste this into Codex or Claude Code to install the Outlook -> CRM connector starter.

If the operator should not touch setup, have an admin or IT person use this note instead:
- `/Users/scottmoran/brain/projects/go2-audit-product/proposal-ops-send-to-admin.md`

```text
Install this Outlook -> CRM connector starter for my machine.

What to do:
1. Read the README in this repo.
2. Generate the correct local paste-in setup block for Codex or Claude Code.
3. Ask only for the Outlook and CRM credentials you truly need.
4. Run one test that:
   - reads recent sent follow-ups from Outlook
   - matches people in the CRM by email
   - writes one note and one follow-up task
5. If any email cannot be matched, leave it in a review list instead of dropping it.
6. If the writeback fails, show the exact failing step and the smallest next fix.

Output:
- the setup block
- the env vars to add
- the first successful test result or exact blocker

Do not give me a long explanation unless something fails.
```
