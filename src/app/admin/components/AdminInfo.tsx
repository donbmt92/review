'use client';

export default function AdminInfo() {
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="admin-user">
      <span>👤 Admin</span>
      <button 
        onClick={handleLogout}
        className="logout-btn"
        style={{
          background: 'none',
          border: 'none',
          color: '#ef4444',
          cursor: 'pointer',
          fontSize: '0.75rem',
          marginLeft: '0.5rem',
          textDecoration: 'underline'
        }}
        title="Đăng xuất"
      >
        🚪
      </button>
    </div>
  );
}
