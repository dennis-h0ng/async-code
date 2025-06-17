# Async Code Agent

Use Claude Code / CodeX CLI to perform multiple tasks in parallel with a Codex-style UI.

A code agent task management system that provides parallel execution of AI-powered coding tasks. Users can run multiple Claude Code agents simultaneously through a Codex-style web interface, with support for different agents for comparison and evaluation.

![async-code-ui](https://github.com/user-attachments/assets/e490c605-681a-4abb-a440-323e15f1a90d)


![async-code-review](https://github.com/user-attachments/assets/bbf71c82-636c-487b-bb51-6ad0b393c2ef)


## Key Features

- 🤖 **Multi-Agent Support**: Run Claude Code and other AI agents in parallel
- 🔄 **Parallel Task Management**: Execute multiple coding tasks simultaneously  
- 🌐 **Codex-Style Web UI**: Clean interface for managing agent tasks
- 🔍 **Agent Comparison**: Compare outputs from different AI models
- 🐳 **Containerized Execution**: Secure sandboxed environment for each task
- 🔗 **Git Integration**: Automatic repository cloning, commits, and PR creation
- 🗄️ **Supabase Integration**: User authentication and task data management
- **Selfhost**: Deploy your own parallel code agent platform

## Architecture

- **Frontend**: Next.js with TypeScript and TailwindCSS
- **Backend**: Python Flask API with Docker orchestration
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Authentication**: Supabase Auth with GitHub OAuth
- **Agents**: Claude Code (Anthropic) with extensible support for other models
- **Task Management**: Parallel execution system based on containers

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ 
- Python 3.8+
- Supabase account
- GitHub account
- Anthropic API key

## Setup Guide

### 1. Clone Repository

```bash
git clone <this-repo>
cd async-code
```

### 2. Supabase Setup

#### Create Supabase Project
1. Visit [Supabase](https://supabase.com) and create account
2. Create new project with these settings:
   - **Name**: `async-code` (or preferred name)
   - **Database Password**: Choose a strong password
   - **Region**: Select closest region
   - **Pricing Plan**: Free tier is sufficient

#### Initialize Database Schema
1. Go to Supabase Dashboard → **SQL Editor**
2. Create new query and copy contents from `db/init_supabase.sql`
3. Run the SQL script to create tables and policies
4. Verify tables created: **Database** → **Tables** (should see `users`, `projects`, `tasks`)

#### Configure GitHub OAuth Provider
1. **Create GitHub OAuth App**:
   - GitHub.com → Settings → Developer settings → OAuth Apps
   - Click "New OAuth App" with:
     - **Application name**: `async-code`
     - **Homepage URL**: `http://localhost:3000`
     - **Authorization callback URL**: `https://your-project-ref.supabase.co/auth/v1/callback`
   - Copy **Client ID** and generate **Client Secret**

2. **Enable GitHub Provider in Supabase**:
   - Supabase Dashboard → **Authentication** → **Providers**
   - Enable GitHub provider
   - Add your GitHub **Client ID** and **Client Secret**
   - Save configuration

3. **Configure Site URLs**:
   - Authentication → **Settings**
   - **Site URL**: `http://localhost:3000`
   - **Redirect URLs**: Add `http://localhost:3000/**`

### 3. Environment Variables

#### Frontend Environment (`async-code-web/.env.local`)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

#### Backend Environment (`server/.env`)
```bash
# Supabase Configuration
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# API Keys
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True
```

> **Getting Supabase Keys**: 
> - Go to Supabase Dashboard → **Settings** → **API**
> - Copy **Project URL**, **anon public key**, and **service_role key**

### 4. Install and Run

```bash
# Build and start services
./build.sh

# Or manually:
cd async-code-web && npm install && npm run dev  # Frontend (port 3000)
cd server && pip install -r requirements.txt && python main.py  # Backend (port 5000)
```

### 5. First Time Usage

1. **Access Application**: http://localhost:3000
2. **Sign in with GitHub**: Click GitHub login button
3. **Configure GitHub Token**: 
   - Create GitHub Personal Access Token with `repo` permissions
   - Enter token in the web interface
4. **Create Project**: Add your first repository project
5. **Submit Tasks**: Start coding tasks with AI agents

## Usage

1. **Setup GitHub Token**: Enter your GitHub token in the web interface
2. **Configure Repository**: Specify target repository and branch
3. **Select Agent**: Choose your preferred AI agent (Claude Code, etc.)
4. **Submit Tasks**: Start multiple coding tasks in parallel
5. **Compare Results**: Review and compare outputs from different agents
6. **Create PRs**: Generate pull requests from successful tasks

## Environment Variables Reference

### Required Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Frontend | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Frontend | Supabase anonymous key |
| `SUPABASE_URL` | Backend | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Backend | Supabase service role key |
| `ANTHROPIC_API_KEY` | Backend | Anthropic API key for Claude |

### Optional Variables

| Variable | Location | Default | Description |
|----------|----------|---------|-------------|
| `FLASK_ENV` | Backend | `production` | Flask environment |
| `FLASK_DEBUG` | Backend | `False` | Flask debug mode |

## Development

### Development Mode
```bash
# Frontend development server
cd async-code-web && npm run dev

# Backend development server  
cd server && python main.py

# Full stack with Docker
docker-compose up
```

### Database Schema Changes
- Edit `db/init_supabase.sql`
- Run updated SQL in Supabase SQL Editor
- Update TypeScript types in `async-code-web/types/supabase.ts`

## Troubleshooting

### Common Issues

1. **"supabaseUrl is required" Error**
   - Ensure `async-code-web/.env.local` exists with correct Supabase URLs
   - Restart development server after creating env files

2. **"Unsupported provider: provider is not enabled"**
   - Configure GitHub OAuth provider in Supabase Dashboard
   - Verify GitHub OAuth app callback URL matches Supabase project

3. **Authentication Issues**
   - Check Site URL and Redirect URLs in Supabase Auth settings
   - Verify GitHub OAuth app configuration

4. **Database Connection Issues**
   - Verify Supabase service role key in `server/.env`
   - Check if database schema is properly initialized

## Production Deployment

For production deployment:

1. **Update Environment Variables**:
   - Change Site URLs to production domain
   - Use production Supabase project
   - Update GitHub OAuth app URLs

2. **Security**:
   - Use strong database passwords
   - Rotate API keys regularly
   - Enable Row Level Security policies

## License

See LICENSE file for details.

