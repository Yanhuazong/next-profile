export async function GET() {
  // Fetch data
  let profiles = [
    { id: 1, name: "Ava Lee", major: "CS", year: 2, gpa: 3.6 },
    { id: 2, name: "Ben Park", major: "CGT", year: 3, gpa: 3.2 },
  ];

  return Response.json(profiles);
}
export async function POST(request) {
  const newProfile = {name: "Bob Smith",   major: "CS",   year: 1, gpa: 1.0 }
  // Here you would typically add the new profile to your database
  return Response.json(newProfile, { status: 201 });
}