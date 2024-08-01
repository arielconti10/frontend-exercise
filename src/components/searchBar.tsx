"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SearchBar({ name }: { name?: string }) {
  const [searchText, setSearchText] = useState(name || "");
  const router = useRouter();

  return (
    <section
      className="relative m-4 flex w-full flex-row gap-4"
      data-testid="search-bar"
    >
      <Search className="text-muted-foreground absolute left-2 top-2.5 h-4 w-4" />
      <Input
        placeholder="Search"
        className="pl-8"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        onKeyDownCapture={(e) => {
          if (e.key === "Enter") {
            router.replace(`/?search=${searchText}`);
          }
        }}
      />

      {searchText && (
        <X
          className="text-muted-foreground absolute right-28 top-2.5 h-4 w-4 cursor-pointer"
          data-testid="clear-icon"
          onClick={() => {
            setSearchText("");
            router.replace("/");
          }}
        />
      )}

      <Button onClick={() => router.replace(`/?name=${searchText}`)}>
        Search
      </Button>
    </section>
  );
}
