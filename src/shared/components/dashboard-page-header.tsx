import { Plus } from 'lucide-react';
import { Link } from '@/i18n/navigation';

interface PageHeaderProps {
  title: string;
  Text?: string;
  Href?: string;
}

export default function DashboardPageHeader({
  title,
  Text,
  Href,
}: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold text-text-plain">
        {title}
      </h2>

      {Text && Href && (
        <Link
          href={Href}
          className="inline-flex items-center bg-bg-primary-saturated py-2 px-4 font-medium rounded-lg text-text-inverse"
        >
          <Plus size={18} className="me-2" />
          {Text}
        </Link>
      )}
    </div>
  );
}
