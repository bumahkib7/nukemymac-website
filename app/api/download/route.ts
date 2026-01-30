import { NextResponse } from 'next/server';

const GITHUB_REPO = 'bumahkib7/NukeMyMac';
const CACHE_DURATION = 300; // 5 minutes

interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  html_url: string;
  body: string;
  assets: {
    name: string;
    browser_download_url: string;
    size: number;
    download_count: number;
  }[];
}

interface ReleaseInfo {
  version: string;
  name: string;
  publishedAt: string;
  releaseUrl: string;
  changelog: string;
  downloadUrl: string | null;
  downloadSize: string | null;
  downloadCount: number;
}

let cachedRelease: ReleaseInfo | null = null;
let cacheTime = 0;

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export async function GET() {
  try {
    const now = Date.now();

    // Return cached response if valid
    if (cachedRelease && (now - cacheTime) < CACHE_DURATION * 1000) {
      return NextResponse.json(cachedRelease, {
        headers: {
          'Cache-Control': `public, max-age=${CACHE_DURATION}`,
        },
      });
    }

    // Fetch latest release from GitHub
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'NukeMyMac-Website',
        },
        next: { revalidate: CACHE_DURATION },
      }
    );

    if (!response.ok) {
      // If no releases yet, return placeholder
      if (response.status === 404) {
        return NextResponse.json({
          version: '1.0.0',
          name: 'NukeMyMac v1.0.0',
          publishedAt: new Date().toISOString(),
          releaseUrl: `https://github.com/${GITHUB_REPO}/releases`,
          changelog: 'Initial release',
          downloadUrl: null,
          downloadSize: null,
          downloadCount: 0,
        });
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const release: GitHubRelease = await response.json();

    // Find the DMG asset
    const dmgAsset = release.assets.find(
      (asset) => asset.name.endsWith('.dmg')
    );

    const releaseInfo: ReleaseInfo = {
      version: release.tag_name.replace(/^v/, ''),
      name: release.name,
      publishedAt: release.published_at,
      releaseUrl: release.html_url,
      changelog: release.body || 'No changelog available',
      downloadUrl: dmgAsset?.browser_download_url || null,
      downloadSize: dmgAsset ? formatBytes(dmgAsset.size) : null,
      downloadCount: dmgAsset?.download_count || 0,
    };

    // Cache the response
    cachedRelease = releaseInfo;
    cacheTime = now;

    return NextResponse.json(releaseInfo, {
      headers: {
        'Cache-Control': `public, max-age=${CACHE_DURATION}`,
      },
    });
  } catch (error) {
    console.error('Error fetching release:', error);

    // Return cached version if available
    if (cachedRelease) {
      return NextResponse.json(cachedRelease);
    }

    return NextResponse.json(
      { error: 'Failed to fetch release information' },
      { status: 500 }
    );
  }
}
