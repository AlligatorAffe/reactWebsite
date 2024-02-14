export default function Navbar() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/blogpost", label: "Blog" },
    { href: "/Pages/about", label: "About" },
    { href: "/pages/login", label: "Login" },
  ];
  return (
    <nav className="bg-white p-3">
      <ul className="flex space-x-4">
        {navLinks.map((link, index) => (
          <li key={index}>
            <div className="pl-5">
              <a href={link.href}>{link.label}</a>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
