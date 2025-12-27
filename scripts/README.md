# Add Attributes Script

This script adds the required attributes to your Appwrite `website_settings` collection.

## Setup

1. **Get your Appwrite API Key:**
   - Go to https://cloud.appwrite.io/console
   - Navigate to your project
   - Go to **Settings** → **API Keys**
   - Create a new API key with **Database** permissions
   - Copy the API key

2. **Set the API key as environment variable:**
   ```bash
   export APPWRITE_API_KEY="your_api_key_here"
   ```

## Usage

Run the script:
```bash
npm run add-attributes
```

or

```bash
bun run add-attributes
```

## What it does

Adds these attributes to `website_settings` collection:
- `teamTitle` (String, 255)
- `teamDescription` (String, 1000)
- `teamMembers` (String, 65535) - JSON array
- `testimonialsTitle` (String, 255)
- `testimonialsDescription` (String, 1000)
- `testimonials` (String, 65535) - JSON array

All attributes are optional (not required).
