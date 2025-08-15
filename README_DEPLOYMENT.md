# Hướng dẫn Deploy Buyereviews lên VPS

## 📋 Tổng quan
Tài liệu này hướng dẫn cách deploy ứng dụng Buyereviews (Next.js + Prisma) lên VPS với Nginx, SSL và PM2.

## 🚀 Yêu cầu hệ thống
- VPS chạy Ubuntu 20.04+ hoặc CentOS 8+
- Domain name (buyereview.com) trỏ về IP của VPS
- SSH access vào VPS
- Tối thiểu 1GB RAM, 20GB storage

## 🔧 Bước 1: Cài đặt môi trường cơ bản

### Cập nhật hệ thống
```bash
sudo apt update && sudo apt upgrade -y
```

### Cài đặt Node.js 18+
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Kiểm tra phiên bản
node --version
npm --version
```

### Cài đặt PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

### Cài đặt Nginx
```bash
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

### Cài đặt Certbot (SSL)
```bash
sudo apt install certbot python3-certbot-nginx -y
```

## 🗄️ Bước 2: Cài đặt và cấu hình Database

### Option A: PostgreSQL (Khuyến nghị)
```bash
sudo apt install postgresql postgresql-contrib -y

# Tạo user và database
sudo -u postgres createuser --interactive
# Nhập tên user: buyereviews
# Chọn 'y' cho superuser

sudo -u postgres createdb buyereviews

# Đặt password cho user
sudo -u postgres psql
\password buyereviews
# Nhập password: your_secure_password
\q
```

### Option B: MySQL
```bash
sudo apt install mysql-server -y
sudo mysql_secure_installation

# Tạo database và user
sudo mysql -u root -p
CREATE DATABASE buyereviews;
CREATE USER 'buyereviews'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON buyereviews.* TO 'buyereviews'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## 📁 Bước 3: Chuẩn bị ứng dụng

### Clone repository
```bash
cd /var/www
sudo git clone <your-repo-url> buyereviews
sudo chown -R $USER:$USER buyereviews
cd buyereviews
```

### Cài đặt dependencies
```bash
npm install
```

### Tạo file environment production
```bash
cp .env.example .env.production
nano .env.production
```

Nội dung file `.env.production`:
```env
# Database
DATABASE_URL="postgresql://buyereviews:your_secure_password@localhost:5432/buyereviews"
# Hoặc MySQL: DATABASE_URL="mysql://buyereviews:your_secure_password@localhost:3306/buyereviews"

# Admin credentials
NEXT_PUBLIC_ADMIN_USERNAME=your_admin_username
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password

# Next.js
NODE_ENV=production
```

## 🔄 Bước 4: Cập nhật Prisma Schema

### Tạo schema production
```bash
cp prisma/schema.prisma prisma/schema.production.prisma
nano prisma/schema.production.prisma
```

Thay đổi datasource:
```prisma
datasource db {
  provider = "postgresql" // hoặc "mysql"
  url      = env("DATABASE_URL")
}
```

### Cập nhật package.json
Thêm scripts mới:
```json
{
  "scripts": {
    "build:prod": "prisma generate && prisma migrate deploy && next build",
    "start:prod": "next start -p 3000",
    "db:migrate": "prisma migrate deploy",
    "db:generate": "prisma generate"
  }
}
```

## 🚀 Bước 5: Deploy ứng dụng

### Generate Prisma client
```bash
npx prisma generate
```

### Chạy database migrations
```bash
npx prisma migrate deploy
```

### Build ứng dụng
```bash
npm run build:prod
```

### Khởi động với PM2
```bash
pm2 start npm --name "buyereviews" -- start:prod
pm2 save
pm2 startup
```

## 🌐 Bước 6: Cấu hình Nginx

### Tạo site configuration
```bash
sudo nano /etc/nginx/sites-available/buyereviews
```

Nội dung:
```nginx
server {
    listen 80;
    server_name buyereview.com www.buyereview.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;
}
```

### Kích hoạt site
```bash
sudo ln -s /etc/nginx/sites-available/buyereviews /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

## 🔒 Bước 7: Cấu hình SSL

### Tạo SSL certificate
```bash
sudo certbot --nginx -d buyereview.com -d www.buyereview.com
```

### Tự động gia hạn SSL
```bash
sudo crontab -e
# Thêm dòng:
0 12 * * * /usr/bin/certbot renew --quiet
```

## 📝 Bước 8: Tạo Deployment Script

### Tạo file deploy.sh
```bash
nano deploy.sh
```

Nội dung:
```bash
#!/bin/bash

echo "🚀 Bắt đầu deploy Buyereviews..."
echo "Thời gian: $(date)"

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy

# Build application
echo "🏗️ Building application..."
npm run build

# Restart PM2
echo "🔄 Restarting application..."
pm2 restart buyereviews

echo "✅ Deployment completed successfully!"
echo "Thời gian hoàn thành: $(date)"
```

### Cấp quyền thực thi
```bash
chmod +x deploy.sh
```

## 🔄 Bước 9: Cấu hình Auto-deploy (Optional)

### Tạo webhook endpoint
```bash
# Cài đặt webhook receiver
npm install -g webhook-receiver

# Tạo webhook script
nano webhook.sh
```

Nội dung webhook.sh:
```bash
#!/bin/bash
cd /var/www/buyereview
./deploy.sh
```

### Cấu hình cron job
```bash
crontab -e
# Thêm dòng để check update mỗi giờ:
0 * * * * cd /var/www/buyereviews && git fetch && git status | grep -q "behind" && ./deploy.sh
```

## 📊 Bước 10: Monitoring và Logs

### PM2 monitoring
```bash
# Xem status
pm2 status

# Xem logs
pm2 logs buyereviews

# Monitor real-time
pm2 monit
```

### Nginx logs
```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

### Application logs
```bash
# Xem logs của ứng dụng
pm2 logs buyereviews --lines 100
```

## 🛠️ Bước 11: Troubleshooting

### Kiểm tra port
```bash
# Kiểm tra port 3000
sudo netstat -tlnp | grep :3000

# Kiểm tra port 80 và 443
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443
```

### Kiểm tra services
```bash
# Kiểm tra Nginx
sudo systemctl status nginx

# Kiểm tra PostgreSQL/MySQL
sudo systemctl status postgresql
# hoặc
sudo systemctl status mysql

# Kiểm tra PM2
pm2 status
```

### Restart services
```bash
# Restart Nginx
sudo systemctl restart nginx

# Restart database
sudo systemctl restart postgresql
# hoặc
sudo systemctl restart mysql

# Restart ứng dụng
pm2 restart buyereviews
```

## 🔧 Bước 12: Backup và Maintenance

### Backup database
```bash
# PostgreSQL
pg_dump -U buyereviews buyereviews > backup_$(date +%Y%m%d_%H%M%S).sql

# MySQL
mysqldump -u buyereviews -p buyereviews > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Backup application
```bash
# Tạo backup folder
mkdir -p /var/backups/buyereviews

# Backup source code
tar -czf /var/backups/buyereviews/app_$(date +%Y%m%d_%H%M%S).tar.gz /var/www/buyereviews

# Backup environment files
cp /var/www/buyereviews/.env.production /var/backups/buyereviews/
```

### Tạo backup script
```bash
nano backup.sh
```

Nội dung:
```bash
#!/bin/bash
BACKUP_DIR="/var/backups/buyereviews"
DATE=$(date +%Y%m%d_%H%M%S)

# Tạo backup directory
mkdir -p $BACKUP_DIR

# Backup database
pg_dump -U buyereviews buyereviews > $BACKUP_DIR/db_$DATE.sql

# Backup application
tar -czf $BACKUP_DIR/app_$DATE.tar.gz /var/www/buyereviews

# Backup environment
cp /var/www/buyereviews/.env.production $BACKUP_DIR/env_$DATE

# Xóa backup cũ (giữ 7 ngày)
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "env_*" -mtime +7 -delete

echo "Backup completed: $DATE"
```

## 📋 Checklist hoàn thành

- [ ] VPS được cài đặt và cấu hình
- [ ] Node.js và npm được cài đặt
- [ ] PM2 được cài đặt
- [ ] Nginx được cài đặt và cấu hình
- [ ] Database được cài đặt và cấu hình
- [ ] Prisma schema được cập nhật
- [ ] Environment variables được cấu hình
- [ ] Ứng dụng được build và deploy
- [ ] PM2 process được khởi động
- [ ] Nginx site được kích hoạt
- [ ] SSL certificate được cấu hình
- [ ] Deployment script được tạo
- [ ] Monitoring được thiết lập
- [ ] Backup strategy được cấu hình

## 🆘 Hỗ trợ

Nếu gặp vấn đề trong quá trình deploy:

1. Kiểm tra logs: `pm2 logs buyereviews`
2. Kiểm tra Nginx: `sudo nginx -t`
3. Kiểm tra database connection
4. Kiểm tra firewall settings
5. Kiểm tra domain DNS settings

## 📚 Tài liệu tham khảo

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [Let's Encrypt](https://letsencrypt.org/docs/)

---

**Lưu ý**: Đảm bảo thay đổi tất cả password mặc định và cấu hình bảo mật phù hợp cho production environment.
cd /var/www/buyereview
git pull
npm run build
pm2 restart buyereview