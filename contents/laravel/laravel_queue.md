# Laravel Queue

For more, check: [Laravel Queue Docs](https://laravel.com/docs/11.x/queues)

---
### Installation

1. #### Install supervisor

```bash
sudo apt-get install supervisor
```

2. #### Create supervisor config

```bash 
sudo vim /etc/supervisor/conf.d/laravel-worker.conf
```

3. #### Paste and edit supervisor config

```bash
# TODO: - update program name
#       - update user
#       - update numprocs
#       - update command
#       - update stdout_logfile
[program:laravel-worker] 
process_name=%(program_name)s_%(process_num)02d
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
redirect_stderr=true
stopwaitsecs=3600
#################################################
user=forge
numprocs=8 
command=php /var/www/html/app.com/artisan queue:work --sleep=3 --tries=3 --max-time=3600 #--queue=high
stdout_logfile=/var/www/html/app.com/storage/logs/worker.log
```

4. #### Run supervisor config

```bash
sudo supervisorctl reread
sudo supervisorctl update
# change laravel-worker to match your config program name
sudo supervisorctl start "laravel-worker:*"
```

---
### Example config

1. #### Laravel telegram logger worker config

```bash
# TODO: - update program name
#       - update user
#       - update numprocs
#       - update command
#       - update stdout_logfile
[program:laravel-worker-logger]
process_name=%(program_name)s_%(process_num)02d
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
redirect_stderr=true
stopwaitsecs=3600
#################################################
user=root  
numprocs=2 
command=php /var/www/html/app.com/artisan queue:work --sleep=3 --tries=3 --max-time=3600 --queue=telegram-logger
stdout_logfile=/var/www/html/app.com/storage/logs/worker.log
```