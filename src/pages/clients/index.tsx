import { useState } from "react";

import { ClientHeader } from "./ClientHeader";
import { ClientTable } from "./ClientTable";

import { InsideNavbar } from "@/components/ui/inside-navbar";

function Clients() {

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <InsideNavbar text="" onClick={() => {}} />
      <main className="flex-1 p-6 bg-white bg-opacity-50">
        <ClientHeader onSearchChange={setSearchQuery} />
        <ClientTable searchQuery={searchQuery}/>
      </main>
    </div>
  );
}

export default Clients;
