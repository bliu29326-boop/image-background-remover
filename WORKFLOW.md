# WORKFLOW

## Deployment rule
- Every time code is changed and the change is considered ready, push to GitHub immediately to trigger Cloudflare deployment.
- Standard sequence:
  1. Make code changes
  2. Verify locally as needed
  3. Commit changes to git
  4. Push to GitHub
  5. Confirm Cloudflare deployment status

## Notes
- This rule should be followed by default for this project unless the user explicitly says not to push yet.
