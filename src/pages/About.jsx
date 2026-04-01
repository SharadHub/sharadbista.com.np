import { useEffect, useState } from "react";
import {
  GraduationCap,
  Briefcase,
  MapPin,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "120px clamp(1rem, 5vw, 6rem) 4rem",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* Section label */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
          marginBottom: "3rem",
        }}
      >
        <span
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: 12,
            color: "var(--green)",
            letterSpacing: "0.15em",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 32,
              height: 1,
              background: "var(--green)",
            }}
          />
          ABOUT ME
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
          gap: "4rem",
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* Left - bio */}
        <div>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "1.5rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease 0.1s",
            }}
          >
            I build things
            <br />
            <span style={{ color: "var(--green)" }}>for the web services.</span>
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.6s ease 0.2s",
            }}
          >
            {[
              `I am Sharad Bista, a Computer Application (BCA) student based in Kathmandu, Nepal and a full-stack developer focused on building real, production-ready applications.`,

              `I have developed full-stack projects using React, Tailwind CSS, and Supabase (PostgreSQL), where I handled everything from database schema design to API integration and deployment. My work includes building scalable systems, implementing CRUD operations, and optimizing applications for performance and SEO in production environments.`,

              `I focus on writing clean, maintainable code, designing efficient component architectures, and creating user interfaces that are both functional and intuitive.`,

              `I am currently building and learning where I can continue to grow by working on real-world systems and delivering meaningful, high-quality products.`,
            ].map((text, i) => (
              <p
                key={i}
                style={{
                  fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
                  color: "var(--text2)",
                  lineHeight: 1.8,
                }}
              >
                {text}
              </p>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "2rem",
              flexWrap: "wrap",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.6s ease 0.4s",
            }}
          >
            <Link
              to="/projects"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--green)",
                color: "#080c12",
                padding: "10px 24px",
                borderRadius: 6,
                fontWeight: 700,
                fontFamily: "Space Mono, monospace",
                fontSize: 12,
                textDecoration: "none",
              }}
            >
              See My Work <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Right - cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.3s",
          }}
        >
          {/* Quick facts */}
          <div
            style={{
              background: "var(--bg3)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "1.5rem",
            }}
          >
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: 11,
                color: "var(--green)",
                marginBottom: "1rem",
                letterSpacing: "0.1em",
              }}
            >
              QUICK FACTS
            </div>
            {[
              {
                icon: <MapPin size={14} />,
                label: "Location",
                value: "Bhaktapur, Nepal",
              },
              {
                icon: <GraduationCap size={14} />,
                label: "Degree",
                value: "BCA · Dec 2026",
              },
              {
                icon: <Briefcase size={14} />,
                label: "Experience",
                value: "Internship @ Aariyana Tech",
              },
              {
                icon: <Calendar size={14} />,
                label: "Status",
                value: "Open to work",
              },
            ].map(({ icon, label, value }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "0.6rem 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span style={{ color: "var(--green)" }}>{icon}</span>
                <span
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: 10,
                    color: "var(--text2)",
                    minWidth: 80,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--text)",
                    fontWeight: 600,
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Internship highlight */}
          <div
            style={{
              background: "var(--bg3)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "1.5rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: "linear-gradient(90deg, var(--green), var(--cyan))",
              }}
            />
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: 11,
                color: "var(--green)",
                marginBottom: "0.75rem",
                letterSpacing: "0.1em",
              }}
            >
              EXPERIENCE
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "var(--text)",
                marginBottom: 4,
              }}
            >
              Frontend Intern
            </div>
            <div
              style={{ fontSize: 12, color: "var(--text2)", marginBottom: 8 }}
            >
              Aariyana Tech Solutions
            </div>
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: 10,
                color: "var(--text2)",
                marginBottom: 12,
              }}
            >
              Sep 2025 – Dec 2025 · Bhaktapur
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                "Delivered 2 production-ready apps",
                "React + MERN stack",
                "Git collaboration & PR reviews",
                "REST API integration",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                    fontSize: 11,
                    color: "var(--text2)",
                  }}
                >
                  <span
                    style={{
                      color: "var(--green)",
                      marginTop: 1,
                      flexShrink: 0,
                    }}
                  >
                    ▸
                  </span>{" "}
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div
            style={{
              background: "var(--bg3)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "1.5rem",
            }}
          >
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: 11,
                color: "var(--cyan)",
                marginBottom: "0.75rem",
                letterSpacing: "0.1em",
              }}
            >
              EDUCATION
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "var(--text)",
                marginBottom: 4,
              }}
            >
              Bachelor in Computer Application
            </div>
            <div
              style={{ fontSize: 12, color: "var(--text2)", marginBottom: 4 }}
            >
              New Summit College, Bhaktapur
            </div>
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: 10,
                color: "var(--text2)",
              }}
            >
              Expected: December 2026
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
