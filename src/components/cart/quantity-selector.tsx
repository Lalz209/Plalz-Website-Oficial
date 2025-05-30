"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MinusIcon, PlusIcon } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function QuantitySelector({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  disabled = false,
  size = 'md',
  className,
}: QuantitySelectorProps) {
  const [inputValue, setInputValue] = useState(quantity.toString());

  const handleDecrease = () => {
    const newQuantity = Math.max(min, quantity - 1);
    onQuantityChange(newQuantity);
    setInputValue(newQuantity.toString());
  };

  const handleIncrease = () => {
    const newQuantity = Math.min(max, quantity + 1);
    onQuantityChange(newQuantity);
    setInputValue(newQuantity.toString());
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      onQuantityChange(numValue);
    }
  };

  const handleInputBlur = () => {
    const numValue = parseInt(inputValue, 10);
    if (isNaN(numValue) || numValue < min || numValue > max) {
      setInputValue(quantity.toString());
    }
  };

  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  };

  const buttonSizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const inputSizeClasses = {
    sm: 'h-8 w-12 text-sm',
    md: 'h-10 w-16',
    lg: 'h-12 w-20 text-lg',
  };

  return (
    <div className={cn('flex items-center', className)}>
      <Button
        variant="outline"
        size="icon"
        className={cn(buttonSizeClasses[size], 'rounded-r-none border-r-0')}
        onClick={handleDecrease}
        disabled={disabled || quantity <= min}
        aria-label="Disminuir cantidad"
      >
        <MinusIcon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      </Button>
      
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onBlur={handleInputBlur}
        className={cn(
          inputSizeClasses[size],
          'rounded-none border-x-0 text-center focus:z-10'
        )}
        disabled={disabled}
        aria-label="Cantidad"
      />
      
      <Button
        variant="outline"
        size="icon"
        className={cn(buttonSizeClasses[size], 'rounded-l-none border-l-0')}
        onClick={handleIncrease}
        disabled={disabled || quantity >= max}
        aria-label="Aumentar cantidad"
      >
        <PlusIcon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      </Button>
    </div>
  );
} 