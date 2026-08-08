"use client";

/**
 * External dependencies.
 */
import { useTheme } from "next-themes";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

/**
 * Internal dependencies.
 */
import useIsHydrated from "@hooks/useIsHydrated";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const options = [
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
  { value: "system", label: "System", icon: MonitorIcon },
];

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  // The selected theme is only known on the client.
  const isMounted = useIsHydrated();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Change colour theme"
          className="text-muted-foreground hover:text-foreground"
        >
          <SunIcon className="scale-100 rotate-0 transition-transform duration-300 dark:scale-0 dark:-rotate-90" />
          <MoonIcon className="absolute scale-0 rotate-90 transition-transform duration-300 dark:scale-100 dark:rotate-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        {options.map(({ value, label, icon: Icon }) => (
          <DropdownMenuItem
            key={value}
            onSelect={() => setTheme(value)}
            className="gap-2"
            aria-current={isMounted && theme === value ? "true" : undefined}
          >
            <Icon className="size-4" aria-hidden="true" />
            <span>{label}</span>
            {isMounted && theme === value && (
              <span
                className="bg-primary ml-auto size-1.5 rounded-full"
                aria-hidden="true"
              />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModeToggle;
