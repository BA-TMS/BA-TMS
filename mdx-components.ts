/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'; // nextra-theme-blog or your custom theme

// When defining MDX Components, the export function accepts a single parameter components: MDXComponents.

// The key is the name of the HTML element to override.
// The value is the component to render instead.

// Get the default MDX components
const themeComponents = getThemeComponents();

// Merge components
export function useMDXComponents(components: any) {
  return {
    ...themeComponents,
    ...components,
  };
}
