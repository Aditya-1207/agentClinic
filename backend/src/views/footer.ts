export function renderFooter(): string {
  const year = new Date().getFullYear();
  return `<footer>
  <p>&copy; ${year} AgentClinic. All rights reserved.</p>
</footer>`;
}
