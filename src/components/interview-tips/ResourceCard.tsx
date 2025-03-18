
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Clock, ArrowRight, FileText, Presentation, BookOpen } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface VideoResourceProps {
  id: number;
  title: string;
  author: string;
  duration: string;
  views: string;
  thumbnail: string;
  category: string;
  tags: string[];
  description: string;
}

export const VideoResourceCard: React.FC<VideoResourceProps> = ({ 
  title, author, duration, views, thumbnail, category, tags, description 
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://placehold.co/600x400/e2e8f0/64748b?text=Video+Thumbnail";
          }}
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{author}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <p className="text-xs text-gray-500">{views} views</p>
        <Button variant="ghost" size="sm" className="text-sm">
          Watch
          <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

interface PDFResourceProps {
  id: number;
  title: string;
  author: string;
  pages: number;
  category: string;
  description: string;
}

export const PDFResourceCard: React.FC<PDFResourceProps> = ({ 
  title, author, pages, category, description 
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start space-x-4">
        <div className="bg-red-100 p-2 rounded-lg">
          <FileText className="h-8 w-8 text-red-600" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>By {author}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
          <p className="text-xs text-gray-500">{pages} pages</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Download PDF
        </Button>
      </CardFooter>
    </Card>
  );
};

interface PresentationResourceProps {
  id: number;
  title: string;
  author: string;
  slides: number;
  category: string;
  description: string;
}

export const PresentationResourceCard: React.FC<PresentationResourceProps> = ({ 
  title, author, slides, category, description 
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start space-x-4">
        <div className="bg-blue-100 p-2 rounded-lg">
          <Presentation className="h-8 w-8 text-blue-600" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>By {author}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
          <p className="text-xs text-gray-500">{slides} slides</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Presentation
        </Button>
      </CardFooter>
    </Card>
  );
};

interface ArticleResourceProps {
  id: number;
  title: string;
  author: string;
  readTime: string;
  category: string;
  description: string;
}

export const ArticleResourceCard: React.FC<ArticleResourceProps> = ({ 
  title, author, readTime, category, description 
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle>{title}</CardTitle>
          <Badge variant="outline" className="ml-2">
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <div className="flex items-center">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarFallback className="text-xs">
              {author.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="text-xs text-gray-500">{author}</p>
          <Separator orientation="vertical" className="mx-2 h-4" />
          <Clock className="h-3 w-3 text-gray-400 mr-1" />
          <p className="text-xs text-gray-500">{readTime} read</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="ml-auto">
          Read article
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
