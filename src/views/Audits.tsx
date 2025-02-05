import { useEffect, useState } from "react";
import auditsData from "../data/audits.json";

const Audits = () => {
  const [audits, setAudits] = useState(auditsData.audits || []);
  const [viewOptions, setViewOptions] = useState({ ...auditsData.viewOptions });
  const [pendingViewOptions, setPendingViewOptions] = useState({ ...auditsData.viewOptions });

  useEffect(() => {
    document.title = "Audits - Equalify";
  }, []);

  // Function to filter and sort audits based on view options
  const getFilteredAudits = () => {
    let filteredAudits = [...audits];

    // Apply search filter
    if (viewOptions.search) {
      filteredAudits = filteredAudits.filter((audit) =>
        audit.name.toLowerCase().includes(viewOptions.search.toLowerCase())
      );
    }

    // Apply sorting
    switch (viewOptions.sort) {
      case "auditNameAToZ":
        filteredAudits.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "auditNameZToA":
        filteredAudits.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "progressBestToWorst":
        filteredAudits.sort((a, b) => parseInt(b.progress) - parseInt(a.progress));
        break;
      case "progressWorstToBest":
        filteredAudits.sort((a, b) => parseInt(a.progress) - parseInt(b.progress));
        break;
      case "createdLatestToOldest":
        filteredAudits.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
        break;
      case "createdOldestToLatest":
        filteredAudits.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());
        break;
      case "lastRunLatestToOldest":
        filteredAudits.sort((a, b) => new Date(b.lastRun).getTime() - new Date(a.lastRun).getTime());
        break;
      case "lastRunOldestToLatest":
        filteredAudits.sort((a, b) => new Date(a.lastRun).getTime() - new Date(b.lastRun).getTime());
        break;
      default:
        break;
    }

    return filteredAudits;
  };

  // Handle input changes (stores values in pending state)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPendingViewOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  // Apply pending view options when "Save View Options" is clicked
  const handleSaveViewOptions = () => {
    setViewOptions(pendingViewOptions);
  };

  return (
    <div>
      <h1>Audits</h1>
      {audits.length === 0 ? (
        <section>
          <h2>Get Started</h2>
          <a href="/audit-builder">Build Audit</a>
        </section>
      ) : (
        <>
          <nav aria-label="Audits Page">
            <a href="/audit-builder">New Audit</a>
          </nav>
          <article>
            <h2>All Audits</h2>
            <section>
              <h3>View Options</h3>
              <form>
                <fieldset>
                  <legend>Search</legend>
                  <label htmlFor="search">Audit Name:</label>
                  <input
                    type="text"
                    id="search"
                    name="search"
                    value={pendingViewOptions.search}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset>
                  <legend>Sort</legend>
                  <label>
                    <input
                      name="sort"
                      type="radio"
                      value="auditNameAToZ"
                      checked={pendingViewOptions.sort === "auditNameAToZ"}
                      onChange={handleInputChange}
                    />
                    Audit Name (A to Z)
                  </label>
                  <label>
                    <input
                      name="sort"
                      type="radio"
                      value="auditNameZToA"
                      checked={pendingViewOptions.sort === "auditNameZToA"}
                      onChange={handleInputChange}
                    />
                    Audit Name (Z to A)
                  </label>
                  <label>
                    <input
                      name="sort"
                      type="radio"
                      value="progressBestToWorst"
                      checked={pendingViewOptions.sort === "progressBestToWorst"}
                      onChange={handleInputChange}
                    />
                    Progress (Best to Worst)
                  </label>
                  <label>
                    <input
                      name="sort"
                      type="radio"
                      value="progressWorstToBest"
                      checked={pendingViewOptions.sort === "progressWorstToBest"}
                      onChange={handleInputChange}
                    />
                    Progress (Worst to Best)
                  </label>
                  <label>
                    <input
                      name="sort"
                      type="radio"
                      value="createdLatestToOldest"
                      checked={pendingViewOptions.sort === "createdLatestToOldest"}
                      onChange={handleInputChange}
                    />
                    Created (Latest to Oldest)
                  </label>
                  <label>
                    <input
                      name="sort"
                      type="radio"
                      value="createdOldestToLatest"
                      checked={pendingViewOptions.sort === "createdOldestToLatest"}
                      onChange={handleInputChange}
                    />
                    Created (Oldest to Latest)
                  </label>
                  <label>
                    <input
                      name="sort"
                      type="radio"
                      value="lastRunLatestToOldest"
                      checked={pendingViewOptions.sort === "lastRunLatestToOldest"}
                      onChange={handleInputChange}
                    />
                    Last Run (Latest to Oldest)
                  </label>
                  <label>
                    <input
                      name="sort"
                      type="radio"
                      value="lastRunOldestToLatest"
                      checked={pendingViewOptions.sort === "lastRunOldestToLatest"}
                      onChange={handleInputChange}
                    />
                    Last Run (Oldest to Latest)
                  </label>
                </fieldset>

                <button type="button" onClick={handleSaveViewOptions}>
                  Save View Options
                </button>
              </form>
            </section>

            <section>
              <h3>Audits Table</h3>
              <table>
                <thead>
                  <tr>
                    <th><input type="checkbox" aria-label="Select all items" /></th>
                    <th>Name</th>
                    <th>Pages</th>
                    <th>Checks</th>
                    <th>Progress</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Last Run</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredAudits().map((audit) => (
                    <tr key={audit.id}>
                      <td><input type="checkbox" className="row-checkbox" /></td>
                      <td><a href="#">{audit.name}</a></td>
                      <td>{audit.pages}</td>
                      <td>{audit.checks}</td>
                      <td>{audit.progress}</td>
                      <td>{audit.status}</td>
                      <td>{audit.created}</td>
                      <td>{audit.lastRun}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </article>
        </>
      )}
    </div>
  );
};

export default Audits;