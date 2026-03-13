import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { DrawerSideBar } from '../components/DrawerSideBar';
import { FloatingMapButton } from '../components/FloatingMapButton'; 

export const MainLayout = ({ children }) => {
  return (
    <DrawerSideBar>
      <div className="relative min-h-screen">
        
        <Header />

        <div className="flex flex-col min-h-[calc(100vh-64px)] relative"> 
          <main className="grow overflow-x-hidden">
            {children} 
          </main>
          
          <Footer />
          
          <FloatingMapButton />
          
        </div>

      </div>
    </DrawerSideBar>
  );
};
