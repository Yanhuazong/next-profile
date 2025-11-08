import styles from "./page.module.css";
import Link from "next/link";
import Filters from "@/components/Filters";

async function fetchTitles() {
  const response = await fetch(
    "https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php",
    {
      next: { revalidate: 60 },
    }
  );
  const titles = await response.json();
  return titles? titles.titles:[]
}
async function getData({ title, search }) {
  const response = await fetch(
    `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?title=${title}&name=${search}&limit=1000`,
    {
      next: { revalidate: 60 },
    }
  );
  const data = await response.json();
  return data?.profiles || [];
}
export default async function Home({ searchParams }) {
 const searchParamsData = await searchParams;
  const selectedTitle = searchParamsData?.title || "";
  const search = searchParamsData?.search || "";
  const [titles, profiles] = await Promise.all([
    fetchTitles(),
    getData({ title: selectedTitle, search }),
  ]);
console.log("Profiles:", profiles);
  return (

      <main className={styles.main}>
            <div className="section">
      <div className="container">
        <h1>Profile App </h1>
        <Filters titles={titles} title={selectedTitle} search={search} />
        {profiles.length === 0 ? (
          <p>No profiles found.</p>
        ) : (
          <div className="grid">{
            profiles.map((profile) => (
              <Link
                key={profile.id}
                href={`/profile/${profile.id}`}
              >
                <div className={styles['profile-card']}>
                  <div className={styles['profile-card__image']}>
                    <img
                      src={profile.image_url || "/vercel.svg"}
                      alt={profile.name}
                    />
                  </div>
                  <div className={styles['profile-card__content']}>
                    <p>{profile.name}</p>
                    <p>{profile.title}</p>
                    <p>{profile.email}</p>
                  </div>
                </div>
              </Link>
            ))
          }
          </div>
        )}
      
              </div>
    </div>
      </main>

  );
}
