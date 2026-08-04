# ZerÓbito — Frontend

React + TypeScript application served via Nginx in production and CRA dev server locally.

---

## Running locally

### Requirements

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose

### First run

```bash
# 1. Create your local env file from the template
cp .env.example .env
# No values to fill in — the default is already correct for local dev

# 2. Start the container
docker compose -f docker-compose.dev.yml up --build
```

The `--build` flag is only needed the first time or after changing `package.json`. On subsequent runs:

```bash
docker compose -f docker-compose.dev.yml up
```

The app is available at **http://localhost:3000**.

### How hot-reload works

The `src/` and `public/` directories are mounted into the container as volumes. Any file change on your machine is immediately picked up by the CRA dev server inside Docker — the browser refreshes automatically.

### Environment

The dev compose hardcodes `REACT_APP_BACKEND_URL=http://localhost:3001`, which expects the backend to be running locally on that port. No `.env` changes are needed for local development.

---

## Deployment

Deployment is fully automated via GitHub Actions (`.github/workflows/deploy-front-vm.yml`).

### Trigger

Every push to `main` triggers the pipeline.

### Pipeline steps

1. **Build** — Docker builds the production image using the standard `Dockerfile` (multi-stage: Node 20 builds the React app, Nginx serves the static files).
2. **Bake URL** — `REACT_APP_BACKEND_URL` is baked into the build at this step as `http://143.106.73.48:3001`. Changing the backend URL requires updating this value in the workflow file.
3. **Push** — The image is pushed to GitHub Container Registry (GHCR) as `ghcr.io/socialsoftwarelivinglab/zerobito-frontend:latest`.
4. **Deploy** — The pipeline SSHes into the VM and runs `docker compose pull && docker compose up -d` inside `/opt/apps/frontend`, which pulls the new image and restarts the container.

### VM setup

The VM at `143.106.73.48` runs the container via `/opt/apps/frontend/docker-compose.yml`, which pulls the image from GHCR. The required GitHub Actions secrets are:

| Secret | Purpose |
|---|---|
| `VM_HOST` | VM IP address |
| `VM_USERNAME` | SSH user |
| `VM_SSH_KEY` | Private SSH key |
| `VM_PORT` | SSH port |

---

## File overview

| File | Used by |
|---|---|
| `Dockerfile` | GitHub Actions (production build) |
| `Dockerfile.dev` | Local dev only |
| `docker-compose.dev.yml` | Local dev only |
| `docker-compose.yml` | VM (referenced in `/opt/apps/frontend/`) |
| `nginx.conf` | Nginx inside the production container |
| `.env` | Local dev default (`localhost:3001`) |
| `.env.development` | Alt env pointing to the staging VM |
