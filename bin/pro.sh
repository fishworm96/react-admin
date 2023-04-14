npm run build:pro
scp -r ./dist root@47.97.192.98:/data/app/blog/templates/admin/
rm -rf dist