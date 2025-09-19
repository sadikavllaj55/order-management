# Entrypoint to plot container

cd /srv
php artisan optimize
apachectl -D FOREGROUND
