#!/usr/bin/env node

/**
 * Indexing Issues Diagnostic Script
 * Checks for common problems that prevent Google from indexing pages
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

console.log('🔍 Checking for Indexing Issues...\n');

const issues = [];
const warnings = [];
const success = [];

// Configuration
const srcDir = './src/pages';
const publicDir = './public';
const baseUrl = 'https://www.marcfriedmanportfolio.com';

// Check 1: Look for noindex tags in pages
console.log('1️⃣ Checking for unwanted noindex tags...');
function checkNoIndex(dir, isPage = false) {
  const files = readdirSync(dir);

  files.forEach(file => {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      checkNoIndex(fullPath, dir.includes('pages'));
    } else if (extname(file) === '.tsx' || extname(file) === '.ts') {
      const content = readFileSync(fullPath, 'utf-8');

      // Check for noindex in non-status pages
      if (content.includes('noindex') && !fullPath.includes('StatusPages')) {
        issues.push(`❌ Found noindex in ${fullPath}`);
      }
    }
  });
}

try {
  checkNoIndex(srcDir, true);
  success.push('✅ No unwanted noindex tags found');
} catch (error) {
  warnings.push(`⚠️ Could not check noindex tags: ${error.message}`);
}

// Check 2: Look for duplicate meta descriptions
console.log('\n2️⃣ Checking for duplicate meta descriptions...');
const metaDescriptions = new Map();

function checkMetaDescriptions(dir) {
  const files = readdirSync(dir);

  files.forEach(file => {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      checkMetaDescriptions(fullPath);
    } else if (extname(file) === '.tsx') {
      const content = readFileSync(fullPath, 'utf-8');
      const metaMatch = content.match(/name="description"\s+content="([^"]+)"/);

      if (metaMatch) {
        const description = metaMatch[1];
        if (metaDescriptions.has(description)) {
          metaDescriptions.get(description).push(fullPath);
        } else {
          metaDescriptions.set(description, [fullPath]);
        }
      }
    }
  });
}

try {
  checkMetaDescriptions(srcDir);

  let duplicateFound = false;
  metaDescriptions.forEach((files, description) => {
    if (files.length > 1) {
      duplicateFound = true;
      issues.push(`❌ Duplicate meta description found in:\n   ${files.join('\n   ')}\n   Description: "${description.substring(0, 80)}..."`);
    }
  });

  if (!duplicateFound) {
    success.push('✅ All meta descriptions are unique');
  }
} catch (error) {
  warnings.push(`⚠️ Could not check meta descriptions: ${error.message}`);
}

// Check 3: Verify canonical URLs are unique
console.log('\n3️⃣ Checking canonical URLs...');
const canonicalUrls = new Map();

function checkCanonicals(dir) {
  const files = readdirSync(dir);

  files.forEach(file => {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      checkCanonicals(fullPath);
    } else if (extname(file) === '.tsx') {
      const content = readFileSync(fullPath, 'utf-8');
      const canonicalMatch = content.match(/rel="canonical"\s+href="([^"]+)"/);

      if (canonicalMatch) {
        const canonical = canonicalMatch[1];
        if (canonicalUrls.has(canonical)) {
          canonicalUrls.get(canonical).push(fullPath);
        } else {
          canonicalUrls.set(canonical, [fullPath]);
        }
      }
    }
  });
}

try {
  checkCanonicals(srcDir);

  let duplicateCanonical = false;
  canonicalUrls.forEach((files, url) => {
    if (files.length > 1 && !url.includes('404')) {
      duplicateCanonical = true;
      warnings.push(`⚠️ Multiple pages with same canonical URL: ${url}\n   Files: ${files.join(', ')}`);
    }
  });

  if (!duplicateCanonical) {
    success.push('✅ All canonical URLs are unique');
  }
} catch (error) {
  warnings.push(`⚠️ Could not check canonical URLs: ${error.message}`);
}

// Check 4: Verify robots.txt allows crawling
console.log('\n4️⃣ Checking robots.txt...');
try {
  const robotsTxt = readFileSync(join(publicDir, 'robots.txt'), 'utf-8');

  if (robotsTxt.includes('Disallow: /')) {
    issues.push('❌ robots.txt is blocking all pages!');
  } else if (robotsTxt.includes('User-agent: *') && robotsTxt.includes('Allow: /')) {
    success.push('✅ robots.txt allows crawling');
  } else {
    warnings.push('⚠️ robots.txt configuration may need review');
  }

  if (!robotsTxt.includes('Sitemap:')) {
    warnings.push('⚠️ robots.txt missing Sitemap directive');
  }
} catch (error) {
  issues.push(`❌ Could not read robots.txt: ${error.message}`);
}

// Check 5: Look for thin content (pages with very little text)
console.log('\n5️⃣ Checking for thin content...');
function checkContentLength(dir) {
  const files = readdirSync(dir);

  files.forEach(file => {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      checkContentLength(fullPath);
    } else if (extname(file) === '.tsx' && !fullPath.includes('StatusPages')) {
      const content = readFileSync(fullPath, 'utf-8');

      // Remove JSX/code and count remaining text
      const textContent = content
        .replace(/<[^>]+>/g, ' ')
        .replace(/import.*from.*;/g, '')
        .replace(/export.*{/g, '')
        .replace(/const.*=.*{/g, '')
        .replace(/[{}()\[\];]/g, ' ')
        .trim();

      const wordCount = textContent.split(/\s+/).length;

      if (wordCount < 100) {
        warnings.push(`⚠️ Potential thin content in ${fullPath} (estimated ${wordCount} words)`);
      }
    }
  });
}

try {
  checkContentLength(srcDir);
} catch (error) {
  warnings.push(`⚠️ Could not check content length: ${error.message}`);
}

// Check 6: Verify sitemap exists
console.log('\n6️⃣ Checking sitemap...');
try {
  const sitemapPath = join(publicDir, 'sitemap.xml');
  const sitemap = readFileSync(sitemapPath, 'utf-8');

  const urlCount = (sitemap.match(/<loc>/g) || []).length;

  if (urlCount === 0) {
    issues.push('❌ Sitemap is empty!');
  } else if (urlCount < 10) {
    warnings.push(`⚠️ Sitemap only has ${urlCount} URLs - seems low`);
  } else {
    success.push(`✅ Sitemap contains ${urlCount} URLs`);
  }

  // Check for lastmod dates
  if (!sitemap.includes('<lastmod>')) {
    warnings.push('⚠️ Sitemap missing lastmod dates');
  }
} catch (error) {
  issues.push(`❌ Could not read sitemap.xml: ${error.message}`);
}

// Print Results
console.log('\n' + '='.repeat(60));
console.log('📊 DIAGNOSTIC RESULTS');
console.log('='.repeat(60));

if (issues.length > 0) {
  console.log('\n🔴 CRITICAL ISSUES:');
  issues.forEach(issue => console.log(issue));
}

if (warnings.length > 0) {
  console.log('\n⚠️  WARNINGS:');
  warnings.forEach(warning => console.log(warning));
}

if (success.length > 0) {
  console.log('\n✅ PASSED CHECKS:');
  success.forEach(item => console.log(item));
}

console.log('\n' + '='.repeat(60));

if (issues.length > 0) {
  console.log('\n⚠️  Action required! Please fix critical issues above.');
  process.exit(1);
} else if (warnings.length > 0) {
  console.log('\n💡 Consider addressing warnings for better SEO.');
  process.exit(0);
} else {
  console.log('\n🎉 All checks passed!');
  process.exit(0);
}
