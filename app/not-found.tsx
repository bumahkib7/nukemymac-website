import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Graphic */}
        <div className="mb-8">
          <div className="text-[150px] font-bold leading-none bg-gradient-to-br from-[#ff6b35] to-[#ff8f5a] bg-clip-text text-transparent">
            404
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto bg-[#ff6b35] hover:bg-[#ff6b35]/90">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/faq">
            <Button variant="outline" className="w-full sm:w-auto">
              <Search className="w-4 h-4 mr-2" />
              View FAQ
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/download" className="text-[#ff6b35] hover:underline">Download</Link>
            <Link href="/checkout" className="text-[#ff6b35] hover:underline">Pricing</Link>
            <Link href="/contact" className="text-[#ff6b35] hover:underline">Contact</Link>
            <Link href="/faq" className="text-[#ff6b35] hover:underline">FAQ</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
