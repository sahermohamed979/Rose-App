import { Plus } from 'lucide-react';
import { Button } from './ui/button';

interface PageHeaderProps {
  title: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function DashboardPageHeader({
  title,
  buttonText,
  onButtonClick,
}: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold text-text-plain">
        {title}
      </h2>

      {buttonText && (
        <Button
          onClick={onButtonClick}
          variant="default"
          className=" p-2.5 rounded-lg"
        >
          <Plus className=" h-4 w-4 text-text-inverse" />
          <span className="hidden sm:inline">{buttonText}</span>
        </Button>
      )}
    </div>
  );
}
