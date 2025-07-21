import React from 'react';
import { Link } from 'react-router-dom';
import WithUseTransitionDemo from '../components/WithUseTransitionDemo';
import WithoutUseTransitionDemo from '../components/WithoutUseTransitionDemo';
import UseTransitionPromiseDemo from '../components/UseTransitionPromiseDemo';

const UseTransitionPage: React.FC = () => {
  return (
    <div>
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          color: '#007bff',
          marginBottom: '20px',
          display: 'inline-block',
        }}
      >
        ← トップページに戻る
      </Link>
      <h1>useTransition</h1>

      <div style={{ marginTop: '20px' }}>
        <WithoutUseTransitionDemo />
        <WithUseTransitionDemo />
        <UseTransitionPromiseDemo />
      </div>
    </div>
  );
};

export default UseTransitionPage;
