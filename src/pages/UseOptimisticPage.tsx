import { Link } from 'react-router-dom';
import UseOptimisticDemo from '../components/UseOptimisticDemo';

export default function UseOptimisticPage() {
  return (
    <div>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ color: '#0066cc', textDecoration: 'none' }}>
          ← ホームに戻る
        </Link>
      </nav>
      <UseOptimisticDemo />
    </div>
  );
}