# Coscrad

## About us

_COSCARD_ is a loose collaboration of several organizations, technical teams, and communities working in the space of custom software development for indigenous language revitalization and cultural research.

<!-- TODO List member organizations \ projects -->

## About this Repo

We have adopted the monorepo approach to allow our members to maximize opportunities for code sharing and collaboration, while maintaining autonomy and focus on their own individual projects within this workspace.

### Technical Details

This monorepo workspace is managed using [Nx](https://nx.dev). See the `README` in an individual app or lib to learn more about the tools used on that particular project.

### Getting Started

Install Nx globally

> > npm install -g @nrwl/cli

## Workflow

### Spinning up a development instance of `ArangoDb`

To fire up a disposable development instance of `ArangoDB` with docker, run

> > npm run start:db:dev
> > from the project root.

In order for this to work, you'll need to add the following environment variables:

- `ARANGO_DB_SERVER`
- `ARANGO_DB_ROOT_PASSWORD`
- `ARANGO_DB_PORT`

The script will bind the default arango port 8529 of the container to `$ARANGO_DB_PORT` on the host. To verify, you can open

```
localhost:${ARANGO_DB_PORT}
```

in your browser and access the dashboard using `${ARANGO_DB_ROOT_PASSWORD}`.

### Lint

In the project root, run

> > npm run lint

### Tests

Note: Make sure nx cli is installed globally to run the following command.

> > nx test <project-name>

For example, to run the tests for the project `api`, run

> > nx test api

<!-- TODO Add License info \ choose open source license -->

<!-- TODO Add getting started -->

<!-- TODO Add build instructions -->
