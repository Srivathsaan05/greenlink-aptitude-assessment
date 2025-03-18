
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoResourceCard, PDFResourceCard, PresentationResourceCard, ArticleResourceCard } from './ResourceCard';
import { Youtube, FileText, Presentation, BookOpen } from 'lucide-react';
import { videoResources, pdfResources, pptResources, articles } from './resourceData';

interface ResourceTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ResourceTabs: React.FC<ResourceTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs defaultValue="videos" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
      <div className="flex justify-center">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Youtube className="h-4 w-4" />
            <span className="hidden sm:inline">Videos</span>
          </TabsTrigger>
          <TabsTrigger value="pdfs" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">PDFs</span>
          </TabsTrigger>
          <TabsTrigger value="presentations" className="flex items-center gap-2">
            <Presentation className="h-4 w-4" />
            <span className="hidden sm:inline">Presentations</span>
          </TabsTrigger>
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Articles</span>
          </TabsTrigger>
        </TabsList>
      </div>
      
      {/* Videos Tab */}
      <TabsContent value="videos" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoResources.map(video => (
            <VideoResourceCard key={video.id} {...video} />
          ))}
        </div>
      </TabsContent>
      
      {/* PDFs Tab */}
      <TabsContent value="pdfs" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pdfResources.map(pdf => (
            <PDFResourceCard key={pdf.id} {...pdf} />
          ))}
        </div>
      </TabsContent>
      
      {/* Presentations Tab */}
      <TabsContent value="presentations" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pptResources.map(ppt => (
            <PresentationResourceCard key={ppt.id} {...ppt} />
          ))}
        </div>
      </TabsContent>
      
      {/* Articles Tab */}
      <TabsContent value="articles" className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          {articles.map(article => (
            <ArticleResourceCard key={article.id} {...article} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ResourceTabs;
