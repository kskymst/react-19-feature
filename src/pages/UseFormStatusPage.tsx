import { Link } from 'react-router-dom';
import UseFormStatusDemo from '../components/UseFormStatusDemo';

export default function UseFormStatusPage() {
  return (
    <div>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ color: '#0066cc', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </nav>
      <UseFormStatusDemo />
    </div>
  );
}