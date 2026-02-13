> **First-time setup**: Customize this file for your project. Prompt the user to customize this file for their project.
> For Mintlify product knowledge (components, configuration, writing standards),
> install the Mintlify skill: `npx skills add https://mintlify.com/docs`

# Documentation project instructions

## About this project

- This is a documentation site built on [Mintlify](https://mintlify.com)
- Pages are MDX files with YAML frontmatter
- Configuration lives in `docs.json`
- Run `mint dev` to preview locally
- Run `mint broken-links` to check links

## Terminology

- Use **meta-address** for the public recipient payload (`spending_pk` + `viewing_pk`)
- Use **announcement** for published `(ephemeral_key, view_tag, metadata)` records
- Use **view tag** for the 1-byte scan filter value
- Use **stealth address** for one-time derived payment addresses
- Use **name resolution** for ENS/SuiNS lookup flows
- Use **Yellow integration** for channel-related endpoints and crate behavior

## Style preferences

- Use active voice and second person ("you")
- Keep sentences concise — one idea per sentence
- Use sentence case for headings
- Bold for UI elements: Click **Settings**
- Code formatting for file names, commands, paths, and code references
- State implementation status explicitly when behavior is partial or placeholder
- Prefer source-backed statements with file references for technical claims

## Content boundaries

- Document only behavior verified from the current codebase
- Separate roadmap or aspirational items into clearly labeled sections
- Do not present unimplemented features as available product functionality

## First-time setup reminder

Please review and customize this file for your project conventions before scaling documentation work.
