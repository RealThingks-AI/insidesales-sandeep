import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Users, Building2, Briefcase, UserCheck, Calendar, CheckSquare, Settings, LucideIcon } from 'lucide-react';

export interface SearchResult {
  id: string;
  type: 'lead' | 'contact' | 'account' | 'deal' | 'meeting' | 'task' | 'setting';
  title: string;
  subtitle?: string;
  path: string;
  icon: LucideIcon;
}

interface GroupedResults {
  leads: SearchResult[];
  contacts: SearchResult[];
  accounts: SearchResult[];
  deals: SearchResult[];
  meetings: SearchResult[];
  tasks: SearchResult[];
  settings: SearchResult[];
}

const SETTINGS_ITEMS: SearchResult[] = [
  { id: 'account-settings', type: 'setting', title: 'Account Settings', subtitle: 'Profile, timezone, preferences', path: '/settings?tab=account', icon: Settings },
  { id: 'security-settings', type: 'setting', title: 'Security Settings', subtitle: 'Password, sessions, 2FA', path: '/settings?tab=security', icon: Settings },
  { id: 'notification-settings', type: 'setting', title: 'Notification Settings', subtitle: 'Email, push, in-app alerts', path: '/settings?tab=notifications', icon: Settings },
  { id: 'display-settings', type: 'setting', title: 'Display Settings', subtitle: 'Theme, language, format', path: '/settings?tab=display', icon: Settings },
  { id: 'user-management', type: 'setting', title: 'User Management', subtitle: 'Manage users and roles', path: '/settings?tab=admin', icon: Settings },
  { id: 'pipeline-settings', type: 'setting', title: 'Pipeline Settings', subtitle: 'Deal stages configuration', path: '/settings?tab=admin', icon: Settings },
  { id: 'branding-settings', type: 'setting', title: 'Branding Settings', subtitle: 'Logo, colors, app name', path: '/settings?tab=admin', icon: Settings },
  { id: 'email-templates', type: 'setting', title: 'Email Templates', subtitle: 'Manage email templates', path: '/settings?tab=admin', icon: Settings },
];

export function useGlobalSearch(query: string) {
  const [results, setResults] = useState<GroupedResults>({
    leads: [],
    contacts: [],
    accounts: [],
    deals: [],
    meetings: [],
    tasks: [],
    settings: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const trimmedQuery = query.trim();
    
    if (trimmedQuery.length < 2) {
      setResults({
        leads: [],
        contacts: [],
        accounts: [],
        deals: [],
        meetings: [],
        tasks: [],
        settings: [],
      });
      return;
    }

    const abortController = new AbortController();
    const searchTerm = `%${trimmedQuery}%`;

    const performSearch = async () => {
      setIsLoading(true);

      try {
        const [leadsRes, contactsRes, accountsRes, dealsRes, meetingsRes, tasksRes] = await Promise.all([
          supabase
            .from('leads')
            .select('id, lead_name, company_name, email')
            .or(`lead_name.ilike.${searchTerm},company_name.ilike.${searchTerm},email.ilike.${searchTerm}`)
            .limit(5),
          supabase
            .from('contacts')
            .select('id, contact_name, company_name, email')
            .or(`contact_name.ilike.${searchTerm},company_name.ilike.${searchTerm},email.ilike.${searchTerm}`)
            .limit(5),
          supabase
            .from('accounts')
            .select('id, company_name, industry, email')
            .or(`company_name.ilike.${searchTerm},industry.ilike.${searchTerm},email.ilike.${searchTerm}`)
            .limit(5),
          supabase
            .from('deals')
            .select('id, deal_name, customer_name, stage')
            .or(`deal_name.ilike.${searchTerm},customer_name.ilike.${searchTerm},stage.ilike.${searchTerm}`)
            .limit(5),
          supabase
            .from('meetings')
            .select('id, subject, description')
            .or(`subject.ilike.${searchTerm},description.ilike.${searchTerm}`)
            .limit(5),
          supabase
            .from('tasks')
            .select('id, title, description')
            .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
            .limit(5),
        ]);

        if (abortController.signal.aborted) return;

        const leads: SearchResult[] = (leadsRes.data || []).map(lead => ({
          id: lead.id,
          type: 'lead',
          title: lead.lead_name,
          subtitle: lead.company_name || lead.email,
          path: `/leads?highlight=${lead.id}`,
          icon: Users,
        }));

        const contacts: SearchResult[] = (contactsRes.data || []).map(contact => ({
          id: contact.id,
          type: 'contact',
          title: contact.contact_name,
          subtitle: contact.company_name || contact.email,
          path: `/contacts?highlight=${contact.id}`,
          icon: UserCheck,
        }));

        const accounts: SearchResult[] = (accountsRes.data || []).map(account => ({
          id: account.id,
          type: 'account',
          title: account.company_name,
          subtitle: account.industry || account.email,
          path: `/accounts?highlight=${account.id}`,
          icon: Building2,
        }));

        const deals: SearchResult[] = (dealsRes.data || []).map(deal => ({
          id: deal.id,
          type: 'deal',
          title: deal.deal_name,
          subtitle: deal.customer_name || deal.stage,
          path: `/deals?highlight=${deal.id}`,
          icon: Briefcase,
        }));

        const meetings: SearchResult[] = (meetingsRes.data || []).map(meeting => ({
          id: meeting.id,
          type: 'meeting',
          title: meeting.subject,
          subtitle: meeting.description?.substring(0, 50),
          path: `/meetings?highlight=${meeting.id}`,
          icon: Calendar,
        }));

        const tasks: SearchResult[] = (tasksRes.data || []).map(task => ({
          id: task.id,
          type: 'task',
          title: task.title,
          subtitle: task.description?.substring(0, 50),
          path: `/tasks?highlight=${task.id}`,
          icon: CheckSquare,
        }));

        // Filter settings
        const settings = SETTINGS_ITEMS.filter(
          item =>
            item.title.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
            item.subtitle?.toLowerCase().includes(trimmedQuery.toLowerCase())
        );

        setResults({ leads, contacts, accounts, deals, meetings, tasks, settings });
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    const debounceTimer = setTimeout(performSearch, 300);

    return () => {
      clearTimeout(debounceTimer);
      abortController.abort();
    };
  }, [query]);

  const totalResults = useMemo(() => {
    return (
      results.leads.length +
      results.contacts.length +
      results.accounts.length +
      results.deals.length +
      results.meetings.length +
      results.tasks.length +
      results.settings.length
    );
  }, [results]);

  const hasResults = totalResults > 0;

  return { results, isLoading, hasResults, totalResults };
}
