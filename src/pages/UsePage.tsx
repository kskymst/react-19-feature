import { Link } from 'react-router-dom';
import UseDemo from '../components/UseDemo';

export default function UsePage() {
  return (
    <div>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ color: '#0066cc', textDecoration: 'none' }}>
          ← ホームに戻る
        </Link>
      </nav>
      <UseDemo />
    </div>
  );
}