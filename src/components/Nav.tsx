interface NavProps {
  page?: string;
}

export function Nav({ page }: NavProps) {
  return (
    <nav className="nav-inner">
      <a href="/" className="nav-logo-link">
        <img src="/images/logo.svg" alt="etc." className="nav-logo-img" />
      </a>
      <div className="nav-links">
        <a href="/about" className={page === 'about' ? 'active' : ''}>About</a>
        <a href="/photography" className={page === 'photography' ? 'active' : ''}>Photography</a>
      </div>
    </nav>
  );
}
