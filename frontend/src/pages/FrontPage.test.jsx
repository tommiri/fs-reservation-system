import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FrontPage from './FrontPage';

describe('FrontPage', () => {
  it('renders correctly', () => {
    render(<FrontPage />);
    expect(screen.getByText('Welcome to ...')).toBeInTheDocument();
  });

  it('displays navigation instructions', () => {
    render(<FrontPage />);
    expect(screen.getByText(/navigation bar/i)).toBeInTheDocument();
  });

  it('has proper styling', () => {
    render(<FrontPage />);
    const containerElement = screen.getByRole('heading', { level: 1 }).parentElement;
    expect(containerElement).toHaveStyle('padding: 3rem 1rem');
    expect(containerElement).toHaveStyle('text-align: center');
    expect(containerElement).toHaveStyle('margin-top: 60px');
  });

  it('has correct paragraph styling', () => {
    render(<FrontPage />);
    const paragraphElement = screen.getByText(/navigation bar/i).closest('p');
    expect(paragraphElement).toHaveStyle('margin-top: 2rem');
  });
});
