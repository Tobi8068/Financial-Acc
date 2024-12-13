import { useState } from "react";

import { ClientHeader } from "./ClientHeader";
import { ClientTable } from "./ClientTable";

function Clients() {

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <main className="flex-1 p-6">
        <ClientHeader onSearchChange={setSearchQuery} />
        <ClientTable searchQuery={searchQuery}/>
      </main>
    </div>
  );
}

export default Clients;
