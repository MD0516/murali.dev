import Link from 'next/link';
import React from 'react'
import ThemeToggle from '../ui/ThemeToggle';
import Menu from '../ui/Menu';
import { LogoIcon } from '../ui/Icons';

const Navbar = () => {
    const links = [
        { label: "projects", link: "#projects" },
        { label: "skills", link: "#skills" },
        { label: "about", link: "#about" },
        { label: "contact", link: "#contact" },
    ];

    return (
        <div className='sticky top-0 flex justify-between items-center py-4 px-3 z-50 bg-page rounded-b-2xl border-b border-border'>
            <Link href={"#hero"} className="flex items-end gap-2 font-mono font-bold text-md tracking-tight">
                <LogoIcon size={30} />
                <span>
                    murali<span className='text-code-accent'>.dev</span>
                </span>
            </Link>
            <div className="nav hidden sm:flex items-center gap-8 font-mono text-xs text-text-muted uppercase">
                {
                    links.map((item, i) =>
                        <Link href={item.link} key={i} className='hover:text-code-accent'>
                            {item.label}
                        </Link>
                    )
                }
            </div>
            <div className='flex gap-3'>
                <div className='block sm:hidden'>
                    <Menu links={links} />
                </div>
                <ThemeToggle />
            </div>
        </div>
    )
}

export default Navbar