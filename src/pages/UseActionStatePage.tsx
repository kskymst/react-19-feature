import React from 'react';
import { Link } from 'react-router-dom';
import FormActionDemo from '../components/FormActionDemo';
import CounterActionDemo from '../components/CounterActionDemo';

const UseActionStatePage: React.FC = () => {
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
      <h1>useActionState</h1>

      <div style={{ marginTop: '20px' }}>
        <FormActionDemo />
        <CounterActionDemo />
      </div>
    </div>
  );
};

export default UseActionStatePage;