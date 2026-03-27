import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import Input from './Input';

describe('Pruebas en <Input />', () => {
  const mockOnChange = vi.fn();

  test('debe mostrar el label y el puntaje máximo', () => {
    render(
      <Input 
        label="Parcial 1" 
        maxPoints={30} 
        value={20} 
        name="parcial1" 
        onChange={mockOnChange} 
      />
    );
    expect(screen.getByText('Parcial 1')).toBeInTheDocument();
    expect(screen.getByText('Max: 30 pts')).toBeInTheDocument();
  });

  test('debe aplicar clase roja si el valor supera el máximo (isInvalid)', () => {
    render(
      <Input 
        label="Parcial 1" 
        maxPoints={30} 
        value={35} // Valor inválido
        name="parcial1" 
        onChange={mockOnChange} 
      />
    );
    
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveClass('border-red-500');
  });

  test('debe llamar a onChange con los argumentos correctos', () => {
    render(
      <Input 
        label="Parcial 1" 
        maxPoints={30} 
        value={10} 
        name="parcial1" 
        onChange={mockOnChange} 
      />
    );

    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '25' } });
    expect(mockOnChange).toHaveBeenCalledWith('parcial1', '25');
  });
});