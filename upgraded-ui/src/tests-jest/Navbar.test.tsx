// Navbar.test.tsx

import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import '@testing-library/jest-dom'

describe('Navbar component', () => {
  it('renders all navigation links', () => {
    const { getByText } = render(
      <Router>
        <Navbar isNetwork={false} />
      </Router>
    );

    // Assert that all navigation links are rendered
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Network members')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Contact')).toBeInTheDocument();
    expect(getByText('Log in')).toBeInTheDocument();
  });

  // Add more specific tests as needed
});
