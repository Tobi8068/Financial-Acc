import { Header } from "@/components/layout/Header";
import { Navigation } from "@/components/navigation/Navigation";

import Routes from './routes'

function App() {
  return (
    <div className="min-h-screen bg-[url('./assets/img/screen.png')]">
      <Header />
      <Navigation />
      <div className="flex mx-8 rounded-xl">
        {/* <aside className="w-64 bg-white border-r min-h-[calc(100vh-73px)]">
          <Navigation />
        </aside> */}
        <main className="flex-1">
          <Routes />
        </main>
      </div>

    </div>
  );
}

export default App;
