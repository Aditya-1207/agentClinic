# Changelog Skill

**Description:** Automatically generates or updates a `CHANGELOG.md` file in the project root by examining the git commit history and grouping the changes by date.

## Instructions for the AI Agent

When the user invokes this skill, execute the following steps:

1. **Read the Git History:**
   - Run the command: `git log --pretty=format:"%ad: %s" --date=short`
   - This will give you a list of all commits formatted as `YYYY-MM-DD: Commit message`.

2. **Group by Date:**
   - Parse the output and group all commit messages under their respective dates.

3. **Check for Existing Changelog:**
   - Check if `CHANGELOG.md` exists in the project root.
   - If it does NOT exist, create it with a top-level heading `# Changelog`.
   - If it DOES exist, read its current contents to ensure you don't add duplicate entries.

4. **Update the Changelog:**
   - For each date found in the git history, create a level-2 heading (`## YYYY-MM-DD`) if it doesn't already exist.
   - Add the commit messages as bullet points under the correct date heading.
   - Place the newest dates at the top of the file (reverse chronological order).
   - Ignore merge commits or trivial formatting commits if requested.

5. **Report:**
   - Inform the user that the `CHANGELOG.md` has been successfully generated/updated and is ready to be committed.
