import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Menu, X, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

const NAV_ITEMS = [
  { label: "Features",     href: "#features"    },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Assessment",   href: "#assessment"   },
  { label: "AI Chat",      href: "#ai-chat"      },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  // Elevate navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[rgba(9,9,11,0.85)] backdrop-blur-md border-b border-[rgba(255,255,255,0.06)] shadow-glass"
            : "bg-transparent"
        )}
      >
        <nav
          className="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* ── Logo ─────────────────────────────────────────── */}
          <a
            href="#"
            className="flex items-center gap-2.5 group"
            aria-label="FinPilot AI home"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-ibm-blue group-hover:bg-ibm-blue-dark transition-colors duration-200">
              <Bot size={16} className="text-white" strokeWidth={2} />
            </span>
            <span className="font-semibold text-white text-[15px] tracking-tight">
              FinPilot <span className="text-ibm-blue-light">AI</span>
            </span>
          </a>

          {/* ── Desktop Nav Links ─────────────────────────────── */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="px-3.5 py-2 text-sm text-text-secondary hover:text-white transition-colors duration-150 rounded-lg hover:bg-[rgba(255,255,255,0.04)] cursor-pointer"
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 text-sm text-text-secondary hover:text-white transition-colors duration-150 rounded-lg hover:bg-[rgba(255,255,255,0.04)] inline-flex items-center gap-1.5"
                aria-label="GitHub repository"
              >
                <GitBranch size={14} />
                GitHub
              </a>
            </li>
          </ul>

          {/* ── Desktop CTA ───────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              size="sm"
              onClick={() => handleNavClick("#assessment")}
            >
              Analyze My Finances
            </Button>
          </div>

          {/* ── Mobile Menu Toggle ────────────────────────────── */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-colors duration-150"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      {/* ── Mobile Menu ───────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 z-40 bg-[rgba(9,9,11,0.97)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] md:hidden"
          >
            <ul className="flex flex-col px-6 pt-4 pb-6 gap-1" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="w-full text-left px-3 py-3 text-sm text-text-secondary hover:text-white transition-colors rounded-lg hover:bg-[rgba(255,255,255,0.04)] cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-3 text-sm text-text-secondary hover:text-white transition-colors rounded-lg hover:bg-[rgba(255,255,255,0.04)]"
                >
                  <GitBranch size={14} />
                  GitHub
                </a>
              </li>
              <li className="pt-2">
                <Button
                  className="w-full justify-center"
                  onClick={() => handleNavClick("#assessment")}
                >
                  Analyze My Finances
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
