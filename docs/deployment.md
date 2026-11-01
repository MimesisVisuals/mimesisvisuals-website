# GitHub Pages and mimesisvisuals.com

## Suitability

This site is a good technical fit for GitHub Pages: Astro generates static HTML and CSS in `dist/`; there is no server, database or PHP requirement. Keep the source in the existing `MimesisVisuals/mimesisvisuals-website` repository.

The local checkout was empty apart from Git metadata. Its origin is `https://github.com/MimesisVisuals/mimesisvisuals-website.git`, with `main` configured as the branch. The connected GitHub tool returned 404 for this exact repository, so repository visibility, organization plan, permissions and existing Pages configuration have not been confirmed. A 404 may indicate a private repository or missing connector access; it does not prove the repository is absent.

GitHub Pages is available for public repositories on GitHub Free; a private organization repository needs a plan that supports Pages, such as GitHub Team. Confirm eligibility in Settings → Pages. A public Pages website can expose the built content even when the source repository is private.

## Prepare before publishing

1. Confirm the public contact email in `src/config/site.ts`, review copy and finish any required company/legal details using actual company information.
2. Run `npm install`, commit the generated lockfile alongside the source, then run `npm run check` and `npm run build`.
3. Use `npm run dev` to review the page at desktop, tablet and 320px mobile widths. Check keyboard navigation, the skip link and contact link. Review the Greek layout separately when translated.
4. Commit and push only when ready. The supplied `.github/workflows/pages.yml` listens only for `workflow_dispatch`, so a push does not trigger deployment.
5. In repository Settings → Pages → Build and deployment, select **GitHub Actions**.
6. When publication is authorized, open Actions → Deploy Mimesis to GitHub Pages → Run workflow on `main`.

The workflow installs the committed lockfile, checks the source, builds and uploads only `dist/`, and deploys it. It reads the actual Pages origin and base path from `actions/configure-pages`, rather than hardcoding the custom domain. No CNAME file is required for Actions-based publishing.

Without a custom domain, the expected project URL is `https://mimesisvisuals.github.io/mimesisvisuals-website/`. With `mimesisvisuals.com` configured in Pages, the base becomes `/`. Internal section links are fragments; the optional logo URL uses the configured base.

For a local build simulating the project URL in PowerShell:

```powershell
$env:SITE_URL = 'https://mimesisvisuals.github.io'
$env:BASE_PATH = '/mimesisvisuals-website'
npm run build
Remove-Item Env:SITE_URL
Remove-Item Env:BASE_PATH
```

The default local production configuration targets `https://mimesisvisuals.com/`; this does not register or publish the domain.

## Domain setup when requested

Do not change DNS until you are ready to connect the published site. Confirm access to the domain's DNS provider and to the MimesisVisuals organization settings first.

1. Verify `mimesisvisuals.com` under the organization's Pages settings by adding the exact TXT record GitHub provides. Keep that record after verification.
2. In this repository's Settings → Pages, save `mimesisvisuals.com` as the custom domain **before** pointing DNS at GitHub.
3. At the DNS provider, use either an apex ALIAS/ANAME to `mimesisvisuals.github.io` if supported, or these four apex A records:

   | Type | Name | Value |
   | --- | --- | --- |
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | mimesisvisuals.github.io |

4. Replace conflicting web-hosting records for the same host after reviewing them. Preserve mail and unrelated verification records. Do not use a CNAME at the apex or include the repository path in the www target.
5. Wait for GitHub's DNS check and certificate provisioning, then enable **Enforce HTTPS**. DNS propagation can take up to 24 hours. Verify both apex and www, the redirect to the chosen apex domain, and HTTPS.
6. Re-run the manual workflow after adding the custom domain so build-time canonical URLs match the custom-domain origin/base. Check source metadata and asset URLs on the live site.

No DNS lookup, registrar change, repository setting change or deployment has been performed as part of scaffolding.

## Official references

- [Astro: deploy to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [GitHub: configure a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub: manage a custom domain and DNS records](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub: verify a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
