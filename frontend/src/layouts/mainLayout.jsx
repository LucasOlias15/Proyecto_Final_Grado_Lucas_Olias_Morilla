import { Footer } from '../components/common/Footer';
import { TopMenuLayout } from '../components/shop/TopMenuLayout';
import { FloatingMapButton } from '../components/map/FloatingMapButton'; 
import { ScrollToTop } from '../components/common/ScrollToTop';

export const MainLayout = ({ children }) => {
  return (
    <TopMenuLayout>
        
        
        <div className="flex flex-col min-h-[calc(100vh-64px)] relative"> 
          <ScrollToTop />
          <main className="grow overflow-x-hidden">
            {children} 
          </main>
          
          <Footer />
          
          <FloatingMapButton />
          
        </div>

    </TopMenuLayout>
  );
};
