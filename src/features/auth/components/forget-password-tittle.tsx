import { ChevronLeft } from 'lucide-react';
interface AuthTitleProps {
  title: string;
  description: string;
  email?: string;
  icon?: boolean;
  action?: () => void;
}
export default function ForgetTittles({
  title,
  description,
  email,
  icon,
  action,
}: AuthTitleProps) {
  return (
    <div className="border-b pb-4 w-full">
      <h1 className="font-semibold text-2xl text-text-plain flex items-center gap-2">
        {icon && (
          <span className="cursor-pointer inline-block p-1.5 bg-bg-primary rounded-lg ">
            <ChevronLeft
              size={18}
              className="text-white"
              onClick={action}
            />
          </span>
        )}
        {/* title of the current step */}
        {title}
      </h1>
      {/* description of the current step */}
      <span className="font-normal text-base  inline-block">
        {description}
      </span>
      {email && (
        <span className="text-base  font-normal text-blue-600 ">
          {email}
        </span>
      )}
    </div>
  );
}
