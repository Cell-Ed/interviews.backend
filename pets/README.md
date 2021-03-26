# Cell-Ed Pet Inventory API 

## Run Locally

### Install Dependencies

```shell
npm install
```
### Configuration

- Create a `.env` file from the included `.env.sample` with configuration options including your MongoDB connection URI.

### Run in *development* mode:

```shell
npm run dev
```

### Run in *development* mode with debugger:

```shell
npm run dev:debug
```

### Run in *production* mode:

```shell
npm run build
npm start
```

### Run Mocha unit tests

```shell
npm run test
```

## Run with Docker

1. Install [Docker Compose](https://docs.docker.com/compose/install/)

2. Run `docker-compose up`

## Interactive API Explorer

* Open a browser to [http://localhost:3000/api-explorer/](http://localhost:3000/api-explorer/) to view and test API endpoints
   
