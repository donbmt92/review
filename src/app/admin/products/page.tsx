import { Metadata } from 'next';
import Link from 'next/link';
import { db } from '../../lib/db';
import DeleteProductButton from './DeleteProductButton';

export const metadata: Metadata = {
  title: 'Quản lý sản phẩm - Admin Panel',
  robots: 'noindex, nofollow',
};

// Force dynamic rendering for admin panel
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getProducts() {
  try {
    // Lấy tất cả danh mục với sản phẩm
    const categories = await db.category.findMany({ 
      include: {
        products: {
          include: {
            _count: {
              select: {
                highlights: true,
                offers: true
              }
            }
          },
          orderBy: [
            { rank: 'asc' },
            { createdAt: 'desc' }
          ]
        }
      },
      orderBy: { name: 'asc' }
    });
    console.log(categories);
    return categories;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function ProductsPage() {
  const categories = await getProducts();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Quản lý sản phẩm theo danh mục</h1>
        <div className="page-actions">
          <Link href="/admin/products/create" className="btn btn-primary">
            + Thêm sản phẩm
          </Link>
          <Link href="/admin/products/import" className="btn btn-outline">
            🔄 Import từ BuyeReviews
          </Link>
        </div>
      </div>

      {categories.length > 0 ? (
        categories.map((category) => (
          <div key={category.id} className="category-section" style={{ marginBottom: '2rem' }}>
            <div className="category-header" style={{ 
              padding: '1rem 1.5rem', 
              backgroundColor: '#f8fafc', 
              border: '1px solid #e2e8f0',
              borderBottom: 'none',
              borderRadius: '0.5rem 0.5rem 0 0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{category.icon}</span>
                  <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>
                    {category.name}
                  </h2>
                  <span className="status-badge active" style={{ fontSize: '0.75rem' }}>
                    {category.products.length} sản phẩm
                  </span>
                </div>
                <Link 
                  href={`/admin/categories/${category.id}`}
                  className="btn btn-outline"
                  style={{ fontSize: '0.875rem' }}
                >
                  Quản lý danh mục
                </Link>
              </div>
            </div>

            <div className="admin-table" style={{ borderRadius: '0 0 0.5rem 0.5rem' }}>
              {category.products.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Hạng</th>
                      <th>Sản phẩm</th>
                      <th>Điểm</th>
                      <th>Badge</th>
                      <th>Highlights</th>
                      <th>Offers</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.products.map((product) => (
                      <tr key={product.id}>
                        <td>
                          {product.rank ? (
                            <span className="status-badge active">#{product.rank}</span>
                          ) : (
                            <span style={{ color: '#6b7280' }}>—</span>
                          )}
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <img 
                              src={product.imageUrl} 
                              alt={product.title}
                              className="product-image"
                            />
                            <div>
                              <strong style={{ display: 'block', marginBottom: '0.25rem' }}>
                                {product.title.length > 40 ? 
                                  product.title.substring(0, 40) + '...' : 
                                  product.title
                                }
                              </strong>
                              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                ID: {product.id.substring(0, 8)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <strong style={{ color: '#059669' }}>{product.score}</strong>
                        </td>
                        <td>
                          {product.badge ? (
                            <span className="status-badge active" style={{ fontSize: '0.75rem' }}>
                              {product.badge}
                            </span>
                          ) : (
                            <span style={{ color: '#6b7280' }}>—</span>
                          )}
                        </td>
                        <td>
                          <span className="status-badge" style={{ fontSize: '0.75rem' }}>
                            {product._count.highlights}
                          </span>
                        </td>
                        <td>
                          <span className="status-badge" style={{ fontSize: '0.75rem' }}>
                            {product._count.offers}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions">
                            <Link href={`/admin/products/${product.id}`} className="action-btn edit">
                              Sửa
                            </Link>
                            <DeleteProductButton productId={product.id} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                  <p>Chưa có sản phẩm nào trong danh mục này.</p>
                  <Link href="/admin/products/create" className="btn btn-outline" style={{ marginTop: '0.5rem' }}>
                    + Thêm sản phẩm đầu tiên
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="admin-table">
          <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
            <p>Chưa có danh mục nào.</p>
            <Link href="/admin/categories" className="btn btn-outline" style={{ marginTop: '0.5rem' }}>
              Tạo danh mục đầu tiên
            </Link>
          </div>
        </div>
      )}

      {categories.length > 0 && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600' }}>
            💡 Ghi chú về quản lý sản phẩm
          </h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
            <li>Hạng (rank) quyết định thứ tự hiển thị trong trang so sánh</li>
            <li>Badge như "Best Overall", "Popular" sẽ hiển thị nổi bật</li>
            <li>Highlights là các điểm nổi bật của sản phẩm</li>
            <li>Offers là các liên kết mua hàng từ các nhà bán lẻ</li>
            <li>Điểm (score) nên từ 1.0 đến 10.0</li>
          </ul>
        </div>
      )}
    </div>
  );
}
