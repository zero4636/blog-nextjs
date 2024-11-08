# blog-nextjs

# How to run?

This project will include both `node` and `nextjs` applications that support each other. To launch both at the same time, `docker` will be used. Instructions follow these steps:

## Start docker
Docker will build services to create a project run environment
- Runs like current Magento projects. Need service cores from `Mr. Rogerdz`
- Check the .env file to update environment variables.
- To launch the necessary services run: `docker/bin/up`
- To launch cli and execute cmd in it then run: `docker/bin/cli`
- ... (check in folder docker/bin to use cmd)

## Start node api
Node api to create APIs that interact with project data. All source code is in the folder `node-api`

- Access the `node-api` project folder.
- Run `bash bin/start.sh` to run service in the background.
- Run `bash bin/stop.sh` to stop service.
- By default, `Docker` uses `pm2` to run node app. Check in the `bin` folder to use `cmd` support.

## Start next app
All the `nextjs` project's coded sources are located in the `next-app` directory.
By default `next-app` is always started when using `docker` via `pm2`. 


## Getting Started
1. Clone the repository.
2. Run `docker/bin/up` to install all service.
3. Run `npm install` for `next-app` && `node-api` app.
4. Cd into the `node-api` directory and run `bash bin/start.sh` or `bash bin/stop.sh` to enable the node service (run `npm install` before).