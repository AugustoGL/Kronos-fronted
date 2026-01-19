// components/ui/SortableHeader.tsx

import { Button } from '@mantine/core';
import { IconArrowUp, IconArrowDown } from '@tabler/icons-react';

type SortOrder = 'asc' | 'desc' | null;

interface SortableHeaderProps {
  label: string;
  columnKey: string;
  activeKey: string | null;
  order: SortOrder;
  onSort: () => void;
}

export default function SortableHeader({
  label,
  columnKey,
  activeKey,
  order,
  onSort
}: SortableHeaderProps) {
  const isActive = activeKey === columnKey;

  let icon = <IconArrowUp size={16} style={{ opacity: 0.3 }} />;
  if (isActive && order === 'asc') {
    icon = <IconArrowUp size={16} style={{ opacity: 1 }} />;
  } else if (isActive && order === 'desc') {
    icon = <IconArrowDown size={16} style={{ opacity: 1 }} />;
  }

  return (
    <Button
      variant="transparent"
      color="--mantine-color-text"
      size="sm"
      onClick={onSort}
      rightSection={icon}
      style={{ padding: 0 }}
    >
      {label}
    </Button>
  );
}
