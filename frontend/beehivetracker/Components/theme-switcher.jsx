"use client";
import { Button } from "../src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../src/components/ui/dropdown-menu";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 18;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={"sm"}
          className="text-black-primary hover:text-amber-400 hover:bg-black-elevated"
        >
          {theme === "light" ? (
            <Sun key="light" size={ICON_SIZE} className={"text-amber-400"} />
          ) : theme === "dark" ? (
            <Moon key="dark" size={ICON_SIZE} className={"text-amber-400"} />
          ) : (
            <Laptop
              key="system"
              size={ICON_SIZE}
              className={"text-amber-400"}
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-black-surface border-black-border"
        align="end"
      >
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(e) => {
            setTheme(e);
          }}
        >
          <DropdownMenuRadioItem
            className="flex gap-2 text-black-primary hover:bg-black-elevated focus:bg-black-elevated"
            value="light"
          >
            <Sun size={ICON_SIZE} className="text-amber-400" />
            <span>Light</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="flex gap-2 text-black-primary hover:bg-black-elevated focus:bg-black-elevated"
            value="dark"
          >
            <Moon size={ICON_SIZE} className="text-amber-400" />
            <span>Dark</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="flex gap-2 text-black-primary hover:bg-black-elevated focus:bg-black-elevated"
            value="system"
          >
            <Laptop size={ICON_SIZE} className="text-amber-400" />
            <span>System</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ThemeSwitcher };
