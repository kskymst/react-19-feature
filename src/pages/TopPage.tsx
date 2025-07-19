import React from 'react';
import { Link } from 'react-router-dom';

const TopPage: React.FC = () => {
  return (
    <div>
      <h1>トップページ</h1>
      <div style={{ marginTop: '20px' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <Link
              to="/use-transition"
              style={{
                textDecoration: 'none',
                color: '#007bff',
                fontSize: '18px',
              }}
            >
              useTransition
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link
              to="/use-action-state"
              style={{
                textDecoration: 'none',
                color: '#007bff',
                fontSize: '18px',
              }}
            >
              useActionState
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopPage;
