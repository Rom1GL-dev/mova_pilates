// components/url-tabs.tsx
import * as React from 'react';
import { Tabs } from '@/components/ui/tabs';
import { useUrlTabState } from '@/hooks/use-url-tab-state';

type TabsProps = React.ComponentProps<typeof Tabs>;

interface UrlTabsProps
  extends Omit<TabsProps, 'value' | 'defaultValue' | 'onValueChange'> {
  paramKey?: string;
  defaultValue: string;
}

export function UrlTabs({
  paramKey = 'tab',
  defaultValue,
  ...props
}: UrlTabsProps) {
  const [tab, setTab] = useUrlTabState(paramKey, defaultValue);

  return <Tabs value={tab} onValueChange={setTab} {...props} />;
}
