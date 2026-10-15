<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Buyer experience architecture
- Keep the buyer prototype in a shared presentation module with separate content routes, so navigation has real URLs and consistent personal-space chrome.
- Keep illustrative buyer data in a browser-safe module; do not imply identity verification, ticket claiming, or live rewards without connected services.
- Define visual roles in the global semantic design system, so all buyer views and controls share a consistent theme.
- AI recommendations run in a server function that picks only from a browser-safe catalog by id, so the model can't invent events or places.
