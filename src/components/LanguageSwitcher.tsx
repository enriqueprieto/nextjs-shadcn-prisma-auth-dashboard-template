"use client";

import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const LanguageSwitcher = () => {
  const router = useRouter();
  const currentLocale = router.locale || "en"; // Idioma atual

  // Lista de idiomas disponíveis
  const locales = [
    { code: "en", label: "🇬🇧 English" },
    { code: "pt", label: "🇧🇷 Português" },
  ];

  const changeLanguage = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`; // Salva o idioma por 1 ano
    router.push(router.asPath, undefined, {
        locale
    }); // Troca o idioma sem mudar a URL
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">🌍 {locales.find(l => l.code === currentLocale)?.label || "Language"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {locales.map(({ code, label }) => (
          <DropdownMenuItem key={code} onClick={() => changeLanguage(code)}>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
