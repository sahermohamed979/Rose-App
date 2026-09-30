'use client';

import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Button } from '@/shared/components/ui/button';
import { useTranslations } from 'next-intl';

interface TableRowActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function DashboardButtons({
  onEdit,
  onDelete,
}: TableRowActionsProps) {
  const t = useTranslations('button');

  return (
    <div className="flex justify-center items-center gap-2">
      <div className="hidden md:flex items-center gap-2">
        {onEdit && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="flex items-center gap-1.5 h-8 px-3 bg-bg-info-fade text-text-info hover:bg-bg-info-faint hover:text-text-info transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
            {t('edit')}
          </Button>
        )}

        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="flex items-center gap-1.5 h-8 px-3 bg-bg-danger-fade text-text-danger hover:bg-bg-danger-faint hover:text-text-danger transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            {t('delete')}
          </Button>
        )}
      </div>

      <div className="md:hidden flex">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border border-border-muted text-text-plain transition-colors hover:bg-bg-subtle focus:outline-none focus:ring-2 focus:ring-ring-default focus:ring-offset-2">
            <MoreVertical className="w-4 h-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-40 bg-bg-plain border-border-subtle"
          >
            {onEdit && (
              <DropdownMenuItem
                onClick={onEdit}
                className="cursor-pointer gap-2"
              >
                <Pencil className="w-4 h-4 text-text-info" />
                <span className="font-medium text-text-plain">
                  {t('edit')}
                </span>
              </DropdownMenuItem>
            )}

            {onDelete && (
              <DropdownMenuItem
                onClick={onDelete}
                className="cursor-pointer gap-2 text-text-danger focus:bg-bg-danger-fade focus:text-text-danger"
              >
                <Trash2 className="w-4 h-4" />
                <span className="font-medium">{t('delete')}</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
