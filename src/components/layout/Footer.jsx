import { Bot, GitBranch, ExternalLink } from "lucide-react";

const FOOTER_LINKS = [
  {
    heading: "Product",
    links: [
      { label: "Features",     href: "#features"    },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Assessment",   href: "#assessment"   },
      { label: "AI Chat",      href: "#ai-chat"      },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About",    href: "#" },
      { label: "Privacy",  href: "#" },
      { label: "Terms",    href: "#" },
    ],
  },
  {
    heading: "Technology",
    links: [
      {
        label: "IBM Watson Orchestrate",
        href: "https://www.ibm.com/products/watson-orchestrate",
        external: true,
      },
      {
        label: "IBM Cloud",
        href: "https://cloud.ibm.com",
        external: true,
      },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-[rgba(255,255,255,0.07)] bg-[#09090B]"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16 pb-10">
        {/* ── Top row ──────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="inline-flex items-center gap-2.5 mb-4 group" aria-label="FinPilot AI">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-ibm-blue group-hover:bg-ibm-blue-dark transition-colors duration-200">
                <Bot size={16} className="text-white" strokeWidth={2} />
              </span>
              <span className="font-semibold text-white text-[15px] tracking-tight">
                FinPilot <span className="text-ibm-blue-light">AI</span>
              </span>
            </a>
            <p className="text-sm text-text-secondary leading-relaxed max-w-[220px]">
              AI-powered Financial Wellness Coach built with IBM Watson Orchestrate.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://github.com/Himanshu-kroy/FinPilot-AI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-[rgba(255,255,255,0.10)] text-text-secondary hover:text-white hover:border-[rgba(255,255,255,0.20)] transition-all duration-150"
                aria-label="GitHub repository"
              >
                <GitBranch size={15} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold tracking-widest uppercase text-text-muted mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-3" role="list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                      {link.external && (
                        <ExternalLink size={11} className="opacity-50" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Divider ───────────────────────────────────────── */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent mb-8" />

        {/* ── Bottom bar ────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
          <p>&copy; {currentYear} FinPilot AI. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with
            <a
              href="https://www.ibm.com/products/watson-orchestrate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ibm-blue-light hover:text-white transition-colors duration-150"
            >
              IBM Watson Orchestrate
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
