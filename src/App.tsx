import Routes from "./routes";
import { AuthProvider } from "./context/authProvider";

function App() {
  return (
    <div className="min-h-screen bg-[url('./assets/img/screen.png')]">
      <div className="flex rounded-xl">
        <main className="flex-1">
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </main>
      </div>

    </div>
  );
}

export default App;
