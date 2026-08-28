import { contactLinks, site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  const published = contactLinks.filter((link) => link.href);

  return (
    <footer className="border-t border-foreground/10 px-6 py-12 md:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-muted">
          © {year} {site.fullName} — {site.location}
        </p>

        {published.length > 0 && (
          <ul className="flex flex-wrap gap-6">
            {published.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href as string}
                  target={link.href?.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href?.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  aria-label={link.label}
                  className="font-mono text-xs text-muted transition-colors duration-200 hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  );
}
