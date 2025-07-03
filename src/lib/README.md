# Content Management System

This directory contains the content management system for the portfolio website.

## Structure

### `content.ts`
The main content file that contains:
- TypeScript interfaces for type safety
- Portfolio content data
- Helper functions for content retrieval and filtering

## Content Types

### Project
```typescript
interface Project {
  id: string;           // Unique identifier
  title: string;        // Project title
  description: string;  // Project description
  link: string;         // Project URL
  image?: string;       // Optional project image
  category: 'figma-plugin' | 'web-app' | 'mobile-app' | 'other';
  featured?: boolean;   // Whether to show on homepage
  tags?: string[];      // Tags for filtering
}
```

### Section
```typescript
interface Section {
  title: string;        // Section title
  content: string;      // HTML content (supports links)
}
```

## Helper Functions

### Project Management
- `getProjectById(id: string)`: Get a specific project by ID
- `getProjectsByCategory(category)`: Get all projects in a category
- `getFeaturedProjects()`: Get projects marked as featured
- `getProjectsByTag(tag: string)`: Get projects with a specific tag
- `getAllProjects()`: Get all projects
- `getProjectCategories()`: Get unique project categories
- `getAllTags()`: Get all unique tags

## Adding New Content

### Adding a New Project
1. Add a new project object to the `portfolioContent.projects.items` array
2. Include required fields: `id`, `title`, `description`, `link`, `category`
3. Optionally add: `image`, `featured`, `tags`

Example:
```typescript
{
  id: "my-new-project",
  title: "My New Project",
  description: "A description of my new project.",
  link: "https://example.com",
  category: "web-app",
  featured: true,
  tags: ["react", "typescript", "web"],
}
```

### Adding New Categories
1. Update the `Project['category']` type union
2. Add projects with the new category

### Modifying Existing Content
1. Update the content in `portfolioContent`
2. The changes will automatically reflect across all pages

## Usage Examples

### Homepage (Featured Projects)
```typescript
import { getFeaturedProjects } from "@/lib/content";

const featuredProjects = getFeaturedProjects();
```

### Projects Page (All Projects)
```typescript
import { getAllProjects } from "@/lib/content";

const allProjects = getAllProjects();
```

### Filtering by Category
```typescript
import { getProjectsByCategory } from "@/lib/content";

const figmaPlugins = getProjectsByCategory('figma-plugin');
```

## Benefits

1. **Type Safety**: Full TypeScript support prevents runtime errors
2. **Centralized Management**: All content in one place
3. **Scalable**: Easy to add new projects and categories
4. **Filterable**: Built-in filtering capabilities
5. **Maintainable**: Clear structure and helper functions
6. **SEO Friendly**: Structured data for better search engine optimization 