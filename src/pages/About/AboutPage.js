import "./AboutPage.css";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Mateusz Grygier",
      position: "Junior Fullstack Developer",
      linkedin: "https://www.linkedin.com/in/mateusz-grygier/",
      github: "https://github.com/HobbitM",
      image: "mateusz.webp",
    },
    {
      name: "Adrianna Wójcik",
      position: "Junior Fullstack Developer",
      linkedin: "https://www.linkedin.com/in/adrianna-wójcik/",
      github: "https://github.com/adawojcik",
      image: "ada.webp",
    },
    {
      name: "Iza Bonarowska",
      position: "Junior Fullstack Developer / Project Manager",
      linkedin: "https://www.linkedin.com/in/iza-bonarowska/",
      github: "https://github.com/izabonarowska",
      image: "iza.jpg",
    },
    {
      name: "Sebastian Kostrz",
      position: "Junior Fullstack Developer",
      linkedin: "www.linkedin.com/in/sebastian-kostrz-384b7a2a3",
      github: "https://github.com/SebastianKostrz",
      image: "sebastian.png",
    },
    {
      name: "Bartosz Hiltawski",
      position: "Junior Fullstack Developer",
      linkedin: "https://www.linkedin.com/",
      github: "https://github.com/Hiltwa",
      image: "bartosz.jpg",
    },
    {
      name: "Paweł Ignaczak",
      position: "Junior Fullstack Developer",
      linkedin: "https://www.linkedin.com/",
      github: "https://github.com/C00kier",
      image: "pawel.webp",
    },
  ];

  return (
    <div className="team">
      <h1>Meet the Sprout team!</h1>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <div key={index} className="member">
            <img
              src={require(`../../assets/developers/${member.image}`)}
              alt={member.name}
            />
            <h2>{member.name}</h2>
            <p>{member.position}</p>
            <div className="social-links">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a href={member.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
