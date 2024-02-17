"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

const components = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

const navData = [
  {
    name: "Products",
    components: [
      {
        name: "Mechanical Keyboard",
        href: "?search=keyboard",
        description:
          "A mechanical keyboard is a high-performance keyboard with tactile and audio feedback so accurate it allows you to execute every keystroke with lightning-fast precision.",
        picture:
          "https://vibegaming.com.bd/wp-content/uploads/2024/02/Untitled-design-27.png",
      },
      {
        name: "Smartphone",
        href: "/products?search=smartphone",
        description:
          "Discover the latest smartphones with advanced features and cutting-edge technology, perfect for staying connected in Bangladesh.",
        picture:
          "https://waltonbd.com/image/cache/catalog/mobile/smart-phone/xanon-x20/x20-id/3-xanon-x20_id-vibrant%20silver-364x364.png",
      },

      {
        name: "Laptop",
        href: "/products?search=laptop",
        description:
          "Find the perfect laptop for work, gaming, or multitasking in Bangladesh.",
        picture:
          "https://www.startech.com.bd/image/cache/catalog/laptop/lenovo/ideapad-1-15ada7/ideapad-1-15ada7-04-500x500.webp",
      },

      {
        name: "Pen Drive",
        href: "/products?search=pen-drive",
        description: "Get the best deals on pen drives in Bangladesh.",
        picture:
          "https://www.startech.com.bd/image/cache/catalog/pendrive/apacer/ah360/ah360-500x500.jpg",
      },
    ],
  },

  {
    name: "Shops",
    components: [
      {
        name: "Daraz",
        href: "/shops?search=daraz",
        description:
          "Shop online from Daraz, the largest online marketplace in Bangladesh.",
        picture:
          "https://idlc.com/mbr/images/public/LRkfCP0813FHq8MZWgc8yT.PNG",
      },
      {
        name: "Vibe Gaming",
        href: "/shops?search=vibe-gaming",
        description:
          "Vibe Gaming is the leading gaming accessories and peripherals store in Bangladesh.",
        picture:
          "https://vibegaming.com.bd/wp-content/uploads/2023/02/logo-header-light.png",
      },

      {
        name: "Walton",
        href: "/shops?search=walton",
        description:
          "Walton is a leading electronics brand in Bangladesh, offering a wide range of home appliances, smartphones, and more.",
        picture:
          "https://waltonbd.com/image/cache/catalog/mobile/smart-phone/xanon-x20/x20-id/3-xanon-x20_id-vibrant%20silver-364x364.png",
      },
      {
        name: "Startech",
        href: "/shops?search=startech",
        description:
          "Startech is a leading computer hardware and accessories store in Bangladesh.",
        picture:
          "https://www.startech.com.bd/image/cache/catalog/laptop/lenovo/ideapad-1-15ada7/ideapad-1-15ada7-04-500x500.webp",
      },
      {
        name: "IDLC",
        href: "/shops?search=idlc",
        description:
          "IDLC is a leading financial institution in Bangladesh, offering a wide range of financial products and services.",
        picture:
          "https://idlc.com/mbr/images/public/LRkfCP0813FHq8MZWgc8yT.PNG",
      },
    ],
  },
];

export function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navData?.map((nav) => (
          <NavigationMenuItem key={nav?.name} className="block sm:block">
            <NavigationMenuTrigger className="text-sm  sm:text-base">
              {nav.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[250px] gap-3 p-4 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px] max-h-[60vh] overflow-y-auto ">
                {nav?.components?.map((component, i) => (
                  <ListItem
                    key={i}
                    title={component.name}
                    href={component.href}
                  >
                    {/* <h1>{component.name}</h1> */}

                    <div className="flex gap-2 items-center">
                      <img
                        className="w-12 h-12  rounded-full object-cover"
                        src={component.picture}
                        alt={component.name}
                        width={400}
                        height={200}
                      />
                      <h1 className="font-bold ">{component.name}</h1>
                    </div>
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}

        {/* <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = ({ className, title, children, ...props }) => {
  return (
    <li>
      <NavigationMenuLink>
        <Link
          href={props?.href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          {/* <div className="text-sm font-medium leading-none">{title}</div> */}
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
ListItem.displayName = "ListItem";
