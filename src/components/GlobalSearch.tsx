import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useGlobalSearch, SearchResult } from '@/hooks/useGlobalSearch';
import { cn } from '@/lib/utils';

const TYPE_LABELS: Record<SearchResult['type'], string> = {
  lead: 'Leads',
  contact: 'Contacts',
  account: 'Accounts',
  deal: 'Deals',
  meeting: 'Meetings',
  task: 'Tasks',
  setting: 'Settings',
};

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { results, isLoading, hasResults } = useGlobalSearch(query);

  // Global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    setQuery('');
    navigate(result.path);
  };

  const renderGroup = (items: SearchResult[], type: SearchResult['type']) => {
    if (items.length === 0) return null;

    return (
      <CommandGroup key={type} heading={TYPE_LABELS[type]}>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <CommandItem
              key={item.id}
              value={`${item.type}-${item.id}-${item.title}`}
              onSelect={() => handleSelect(item)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="truncate font-medium">{item.title}</span>
                {item.subtitle && (
                  <span className="text-xs text-muted-foreground truncate">
                    {item.subtitle}
                  </span>
                )}
              </div>
            </CommandItem>
          );
        })}
      </CommandGroup>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 h-9 px-3 rounded-md border border-input bg-background text-sm text-muted-foreground",
            "hover:bg-accent hover:text-accent-foreground transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "w-64 lg:w-80"
          )}
          onClick={() => setOpen(true)}
        >
          <Search className="h-4 w-4 shrink-0" />
          <span className="flex-1 text-left truncate">Search everything...</span>
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[320px] lg:w-[400px] p-0" 
        align="start"
        sideOffset={8}
      >
        <Command shouldFilter={false}>
          <CommandInput
            ref={inputRef}
            placeholder="Search leads, contacts, deals..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList className="max-h-[400px]">
            {query.length < 2 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Type at least 2 characters to search...
              </div>
            ) : isLoading ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Searching...
              </div>
            ) : !hasResults ? (
              <CommandEmpty>No results found for "{query}"</CommandEmpty>
            ) : (
              <>
                {renderGroup(results.leads, 'lead')}
                {renderGroup(results.contacts, 'contact')}
                {renderGroup(results.accounts, 'account')}
                {renderGroup(results.deals, 'deal')}
                {renderGroup(results.meetings, 'meeting')}
                {renderGroup(results.tasks, 'task')}
                {renderGroup(results.settings, 'setting')}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
