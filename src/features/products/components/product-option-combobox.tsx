'use client';

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/shared/components/ui/combobox';

interface ProductOption {
  id: string;
  title: string;
}

interface ProductOptionComboboxProps<T extends ProductOption> {
  id: string;
  items: T[];
  value: string;
  placeholder: string;
  emptyMessage: string;
  invalid: boolean;
  onBlur: () => void;
  onValueChange: (value: string) => void;
}

export default function ProductOptionCombobox<
  T extends ProductOption,
>({
  id,
  items,
  value,
  placeholder,
  emptyMessage,
  invalid,
  onBlur,
  onValueChange,
}: ProductOptionComboboxProps<T>) {
  return (
    <Combobox
      items={items}
      value={items.find((item) => item.id === value) ?? null}
      onValueChange={(item) => onValueChange(item?.id ?? '')}
      itemToStringLabel={(item) => item.title}
      itemToStringValue={(item) => item.id}
    >
      <ComboboxInput
        id={id}
        onBlur={onBlur}
        aria-invalid={invalid}
        placeholder={placeholder}
        className="w-full"
      />
      <ComboboxContent>
        <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.id} value={item}>
              {item.title}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
