import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Switch, Navbar as NextUINavbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [isDark, setIsDark] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Hire Me", path: "/hire-me" },
    { name: "My Ventures", path: "/ventures" },
  ];

  return (
    <NextUINavbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className="fixed top-0 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"
    >
      <NavbarContent>
        <NavbarBrand>
          <Link to="/" className="text-2xl font-bold text-[#3ec1d3]">
            SD
          </Link>
        </NavbarBrand>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="end">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link
              to={item.path}
              className={`hover:text-[#3ec1d3] transition-colors ${
                location.pathname === item.path ? 'text-[#3ec1d3]' : ''
              }`}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
        <NavbarItem>
          <Switch
            defaultSelected={isDark}
            size="sm"
            color="primary"
            startContent={<Sun />}
            endContent={<Moon />}
            onChange={toggleTheme}
          />
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            to="/hire-me#contact"
            className="bg-[#3ec1d3] text-white hover:bg-[#2596be] transition-colors"
          >
            Contact Me
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="pt-6">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              to={item.path}
              className={`w-full hover:text-[#3ec1d3] transition-colors ${
                location.pathname === item.path ? 'text-[#3ec1d3]' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Link
            to="/hire-me#contact"
            className="w-full text-[#3ec1d3]"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Me
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Switch
            defaultSelected={isDark}
            size="sm"
            color="primary"
            startContent={<Sun />}
            endContent={<Moon />}
            onChange={toggleTheme}
          />
        </NavbarMenuItem>
      </NavbarMenu>
    </NextUINavbar>
  );
}