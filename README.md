# Yosoku Games / Fantasy Cycling Frontend

The source code for the Fantasy Cycling Frontend. Built with Laravel Nuxt.js.

## Requirements

- [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) v12.18.x

## Run locally

### Env

Go to `src` and ake a copy of `.env.example` and save as `.env`.

### Domain

The domain `www.fantasycycling.dev` is pointing to `127.0.0.4`, so you can use this domain to access the api.

This requires the ip address to be added as an alias to the local loopback interface. This can be done with the following command: `sudo ifconfig lo0 alias www.fantasycycling.dev`.

It does not survive a reboot though. Create a Launch Daemon definition in this path `sudo vim /Library/LaunchDaemons/dev.fantasycycling.frontend.plist`.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>Label</key>
        <string>dev.fantasycycling.frontend.ifconfig</string>
        <key>RunAtLoad</key>
        <true/>
        <key>ProgramArguments</key>
        <array>
            <string>/sbin/ifconfig</string>
            <string>lo0</string>
            <string>alias</string>
            <string>www.fantasycycling.dev</string>
        </array>
    </dict>
</plist>
```

### Docker-compose

There is a fully functional Docker Compose stack which contains an SSL terminating proxy, webserver and the application server with php-fpm.

The SSL terminating proxy uses Traefik. It is configured to automatically generate a Let's Encrypt SSL certificate with the dns challenge.

The following commands need to be specified _before_ starting the stack with `docker-compose up`:

```bash
touch docker/traefik/acme.json
chmod 600 docker/traefik/acme.json
```

As the dns is managed by Cloudflare, the environment variables `CF_API_EMAIL` and `CF_API_KEY` must be set. These can be create by logging in to cloudflare.com and generate a Global API Token. More documentation on how to create those can be found [here](https://api.cloudflare.com/#access-service-tokens-create-access-service-token).

Search for `level=error` in the console output of docker-compose to determine whether the certificate could be loaded properly.

The creation of the SSL certificate can be triggered by running `curl https://www.fantasycycling.dev`. The first time it will fail. However, after a minute it will have gathered the proper certificate.

If the docker could not find an available network, you need to manually select a subnet as part of your network options for the service.

```
docker network create fantasy-cycling_default --subnet 10.0.1.0/24
```

### NPM

```bash
$ cd src

# install dependencies with node v12.18.x
$ npm install

# serve with hot reload at localhost:5000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start
```

Now, your application will work on `localhost:5000`

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

### SSL on GKE k8s

GKE requires a 2048-bit openssl generated certificate following this command:

```bash
openssl req -new -newkey rsa:2048 -nodes -out star_tourzomer_com.csr -keyout star_tourzomer_com.key -subj "/C=NL/ST=North-Holland/L=Amsterdam/O=Yosoku Games/OU=Technology/CN=*.tourzomer.com"
```
