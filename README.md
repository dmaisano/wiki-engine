# Domenico Maisano - Wiki Engine Project

- Frontend was built using Next.js (v12), Typescript, Chakra UI, and some various react libraries I added as project dependencies

  - Frontend app is located in the `next` directory of this monorepo

  - To run the project `cd` into the `next` dir, install deps with `npm install`. Once installed, you can run the project by running the `npm run dev` command inside of the project directory.

  - You can access the frontend application by navigating to [http://localhost:3000/](http://localhost:3000/) in your browser. You can edit the port for the frontend app in the `package.json` and specifying a new port. [reference](https://flaviocopes.com/nextjs-change-app-port/)

- Backend was built using Node.js + Express + Typescript, and TypeORM to interface with [Node SQLite library](https://github.com/mapbox/node-sqlite3)

  - Backend app is located in the `server` directory

  - In the zipped file I've included the .sqlite file I was using for local testing, located in the `./server/data/` directory

  - To run the project `cd` into the `server` dir, install deps with `npm install`. Once installed, you can run the project by running the `npm run dev` command inside of the project directory.

  - The REST API will be running on [http://localhost:3001/](http://localhost:3001/), if you want to debug and test the routes using something like Postman.

> 💡 note: In my dev environment I built the frontend + backend projects using Node version "16.5.0." I am assuming that if you are running a somewhat new version of Node you will not run into any issues installing the node modules and running the scripts for both projects

> If you have any questions, concerns, or run into any issues please feel free to email me, [dmaisanooo@gmail.com](mailto:dmaisanooo@gmail.com)
