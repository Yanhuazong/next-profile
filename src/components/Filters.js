import Link from "next/link";
import { memo } from "react"

const Filters = memo(({titles, title, search}) => {
    
    return (
        <form className="filter-container"  method="GET" action="/">
            <div className="select-filter">
                <label htmlFor="select">Select a title:</label>
                <select id="select" defaultValue={title} name="title">
                <option value="">All</option>
                {
                    titles.map(title => <option key={title} value={title}>{title}</option>)
                }
                </select>
            </div>
            <div className="search-filter">
                <label htmlFor="search">Search by name:</label>
                <input id="search" defaultValue={search} name="search" />
            </div>
            <button  type="submit">Apply Filters</button>
            <Link href="/">Clear Filters</Link>
        </form>
    )
})

Filters.displayName = 'Filters';

export default Filters;