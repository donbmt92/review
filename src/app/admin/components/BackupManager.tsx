'use client';

import { useState, useEffect } from 'react';

interface BackupFile {
  fileName: string;
  filePath: string;
  size: number;
  createdAt: string;
  modifiedAt: string;
  metadata: {
    categoriesCount: number;
    productsCount: number;
    totalRecords: number;
  } | null;
}

interface BackupResponse {
  success: boolean;
  message?: string;
  backupFile?: string;
  metadata?: {
    categoriesCount: number;
    productsCount: number;
    totalRecords: number;
  };
  totalBackups?: number;
  backups?: BackupFile[];
  error?: string;
}

export default function BackupManager() {
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [backups, setBackups] = useState<BackupFile[]>([]);
  const [isLoadingBackups, setIsLoadingBackups] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load danh sách backup khi component mount
  useEffect(() => {
    loadBackups();
  }, []);

  const loadBackups = async () => {
    setIsLoadingBackups(true);
    try {
      const response = await fetch('/api/admin/backup', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer admin-token', // Có thể thay đổi authentication sau
        },
      });

      const data: BackupResponse = await response.json();
      
      if (data.success && data.backups) {
        setBackups(data.backups);
      } else {
        setMessage({ type: 'error', text: data.error || 'Lỗi khi tải danh sách backup' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Lỗi kết nối' });
    } finally {
      setIsLoadingBackups(false);
    }
  };

  const createBackup = async () => {
    setIsCreatingBackup(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/backup', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer admin-token', // Có thể thay đổi authentication sau
        },
      });

      const data: BackupResponse = await response.json();
      
      if (data.success) {
        setMessage({ 
          type: 'success', 
          text: `Backup thành công! File: ${data.backupFile}` 
        });
        // Reload danh sách backup
        loadBackups();
      } else {
        setMessage({ type: 'error', text: data.error || 'Lỗi khi tạo backup' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Lỗi kết nối' });
    } finally {
      setIsCreatingBackup(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="backup-manager">
      <div className="backup-header">
        <h3>🔄 Quản lý Backup Database</h3>
        <button 
          onClick={createBackup}
          disabled={isCreatingBackup}
          className="btn btn-primary"
        >
          {isCreatingBackup ? '⏳ Đang tạo backup...' : '💾 Tạo Backup'}
        </button>
      </div>

      {message && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          {message.text}
        </div>
      )}

      <div className="backup-stats">
        <div className="stat-item">
          <span className="stat-label">Tổng số backup:</span>
          <span className="stat-value">{backups.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Backup gần nhất:</span>
          <span className="stat-value">
            {backups.length > 0 ? formatDate(backups[0].createdAt) : 'Chưa có'}
          </span>
        </div>
      </div>

      <div className="backup-list">
        <h4>📁 Danh sách Backup</h4>
        {isLoadingBackups ? (
          <div className="loading">Đang tải...</div>
        ) : backups.length > 0 ? (
          <div className="backup-table">
            <table>
              <thead>
                <tr>
                  <th>Tên file</th>
                  <th>Kích thước</th>
                  <th>Dữ liệu</th>
                  <th>Ngày tạo</th>
                </tr>
              </thead>
              <tbody>
                {backups.map((backup, index) => (
                  <tr key={backup.fileName}>
                    <td>
                      <div className="backup-file-info">
                        <span className="file-icon">📄</span>
                        <span className="file-name">{backup.fileName}</span>
                      </div>
                    </td>
                    <td>{formatFileSize(backup.size)}</td>
                    <td>
                      {backup.metadata ? (
                        <div className="backup-metadata">
                          <span className="metadata-item">
                            📂 {backup.metadata.categoriesCount} danh mục
                          </span>
                          <span className="metadata-item">
                            📦 {backup.metadata.productsCount} sản phẩm
                          </span>
                        </div>
                      ) : (
                        <span className="no-metadata">Không có metadata</span>
                      )}
                    </td>
                    <td>{formatDate(backup.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-backups">
            <p>Chưa có backup nào. Hãy tạo backup đầu tiên!</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .backup-manager {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .backup-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .backup-header h3 {
          margin: 0;
          color: #1f2937;
          font-size: 1.125rem;
          font-weight: 600;
        }

        .alert {
          padding: 0.75rem 1rem;
          border-radius: 6px;
          margin-bottom: 1rem;
          font-size: 0.875rem;
        }

        .alert-success {
          background-color: #d1fae5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }

        .alert-error {
          background-color: #fee2e2;
          color: #991b1b;
          border: 1px solid #fca5a5;
        }

        .backup-stats {
          display: flex;
          gap: 2rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background-color: #f8fafc;
          border-radius: 6px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat-label {
          font-size: 0.75rem;
          color: #6b7280;
          font-weight: 500;
        }

        .stat-value {
          font-size: 0.875rem;
          color: #1f2937;
          font-weight: 600;
        }

        .backup-list h4 {
          margin: 0 0 1rem 0;
          color: #374151;
          font-size: 1rem;
          font-weight: 600;
        }

        .loading {
          text-align: center;
          padding: 2rem;
          color: #6b7280;
        }

        .backup-table {
          overflow-x: auto;
        }

        .backup-table table {
          width: 100%;
          border-collapse: collapse;
        }

        .backup-table th,
        .backup-table td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }

        .backup-table th {
          background-color: #f9fafb;
          font-weight: 600;
          color: #374151;
          font-size: 0.875rem;
        }

        .backup-table td {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .backup-file-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .file-icon {
          font-size: 1rem;
        }

        .file-name {
          font-weight: 500;
          color: #1f2937;
        }

        .backup-metadata {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .metadata-item {
          font-size: 0.75rem;
          color: #059669;
          font-weight: 500;
        }

        .no-metadata {
          font-size: 0.75rem;
          color: #6b7280;
          font-style: italic;
        }

        .no-backups {
          text-align: center;
          padding: 2rem;
          color: #6b7280;
          background-color: #f9fafb;
          border-radius: 6px;
          border: 1px dashed #d1d5db;
        }

        .btn {
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary {
          background-color: #3b82f6;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background-color: #2563eb;
        }

        .btn-primary:disabled {
          background-color: #9ca3af;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
