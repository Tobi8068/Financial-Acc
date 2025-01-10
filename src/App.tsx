import Routes from "./routes";

function App() {
  return (
    <div className="min-h-screen bg-[url('./assets/img/screen.png')]">
      <div className="flex rounded-xl">
        <main className="flex-1">
          <Routes />
        </main>
      </div>

    </div>
  );
}

export default App;
