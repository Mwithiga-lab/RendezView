'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search } from 'lucide-react';

export default function EventFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('sortBy', value);
    } else {
      params.delete('sortBy');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-card rounded-lg shadow-sm">
      <div className="relative w-full md:flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name, location, or category..."
          className="pl-10 h-12"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
        />
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">
        <label htmlFor="sort-by" className="text-sm font-medium shrink-0">Sort by:</label>
        <Select onValueChange={handleSort} defaultValue={searchParams.get('sortBy') || 'date'}>
          <SelectTrigger id="sort-by" className="w-full md:w-[180px] h-12">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
