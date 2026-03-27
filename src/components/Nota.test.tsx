import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import Nota from './Nota';

vi.mock('../hooks/useNotasParciales', () => ({
  useNotasParciales: () => ({
    nota: { parcial1: 20, parcial2: 20, parcial3: 25, total: 65 },
    handleCambiarNota: vi.fn(),
    obtenerNotaParcialMaxima: vi.fn().mockReturnValue(30),
    MAX_TOTAL: 100,
    PASS_SCORE: 65
  })
}));

describe('Pruebas en el componente <Nota />', () => {
  
  test('debe mostrar el título de la calculadora', () => {
    render(<Nota />);
    expect(screen.getByText(/Calculadora de Notas Parciales/i)).toBeInTheDocument();
  });

  test('debe mostrar el mensaje de aprobación cuando la nota es suficiente', () => {
    render(<Nota />);
    expect(screen.getByText(/¡Felicidades! Aprobaste/i)).toBeInTheDocument();
  });

  test('debe renderizar los tres componentes de Input para los parciales', () => {
    render(<Nota />);
    expect(screen.getByText(/Primer Parcial/i)).toBeInTheDocument();
    expect(screen.getByText(/Segundo Parcial/i)).toBeInTheDocument();
    expect(screen.getByText(/Tercer Parcial/i)).toBeInTheDocument();
  });

});