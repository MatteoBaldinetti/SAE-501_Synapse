import { useState } from "react";
import SearchBar from "../SearchBar";

function AdminFormation() {
  const [data, setData] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  document.title = "Admin - Formation";

  return (
    <div>
      <h3>Formation</h3>
      <SearchBar
        placeholder="Rechercher une formation"
        data={data.map((f) => f.title)}
        onResults={(filteredTitles) =>
          setFilteredCourses(
            data.filter((f) => filteredTitles.includes(f.title))
          )
        }
      />
    </div>
  );
}

export default AdminFormation;
