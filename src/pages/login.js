// pages/login.js
import { useState } from "react";
import { useRouter } from "next/router";

// Branch options
const branches = [
  "EXTC and Instrumentation",
  "Mechanical and Production Engineering",
  "Chemical",
];

// College options
export const colleges = [
  "AISSMS College of Engineering",
  "Annasaheb Dange College of Engineering and Technology",
  "Atharva College of Engineering",
  "Bharati Vidyapeeth College of Engineering",
  "D. Y. Patil College of Engineering and Technology",
  "Datta Meghe College Of Engineering",
  "Don Bosco Institute of Technology",
  "Dr. Babasaheb Ambedkar Technological University",
  "Fr. Conceicao Rodrigues Institute of Technology",
  "Government College Of Engineering Amravati",
  "Government College of Engineering, Yavatmal",
  "Government Polytechnic Nashik",
  "Government Polytechnic Pune",
  "Government Polytechnic, Tuljapur Road",
  "Jagdambha College Of Engineering & Technology",
  "K.C. College of Engineering & Management Studies & Research",
  "Lokmanya Tilak College Of Engineering",
  "M. H. Saboo Siddik Engineering College",
  "Maharashtra Institute of Technology Aurangabad",
  "M.B.E. Society's College of Engineering",
  "Marathwada Mitra Mandal's College of Engineering",
  "MET Institute of Technology Polytechnic",
  "Navsahyadri Education Society's Group of Institutions",
  "PES Modern College of Engineering",
  "Pravara Rural Education Society's Sir Visvesvaraya Institute of Technology",
  "Pune District Education Association College of Engineering",
  "Rizvi College of Engineering",
  "Sanjay Ghodawat University",
  "Sanjivani College of Engineering",
  "Sant Gadge Baba Amravati University",
  "Savitribai Phule Pune University",
  "Shatabdi College of Engineering and Research",
  "Shivaji S. Jondhale College of Engineering",
  "Shri Guru Gobind Singhji Institute of Engineering and Technology",
  "SKN Sinhgad College of Engineering",
  "Smt. Indira Gandhi College Of Engineering",
  "Smt. Kashibai Navale College of Engineering",
  "SNJB's Late Sau Kantabai Bhavarlalji Jain College of Engineering",
  "Sreyas Institute of Engineering and Technology",
  "St. John College of Engineering and Management",
  "Suryodaya College of Engineering & Technology",
  "Tatyasaheb Kore Institute of Engineering and Technology",
  "Teegala Krishna Reddy Engineering College",
  "Terna Engineering College",
  "Terna Public Charitable Trust's College of Engineering",
  "Thadomal Shahani Engineering College",
  "TPCT's College Of Engineering",
  "Vidyalankar Institute of Technology",
  "Vidyavardhini's College of Engineering and Technology Campus",
  "Vishwakarma Institute of Technology (VIT)",
  "D.Y.Patil College of Engineering & Technology Kasabawad Kolhapur",
];

export default function LoginPage() {
  const router = useRouter();

  // Form state
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    branch: branches[0],
    college: colleges[0],
  });

  // Error state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle change for each field
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Simple client-side validation
  function validate() {
    if (!form.username.trim()) {
      return "Username is required.";
    }
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return "Valid email is required.";
    }
    if (!form.phone.match(/^[0-9]{10}$/)) {
      return "Phone must be a valid 10-digit number.";
    }
    if (!branches.includes(form.branch)) {
      return "Please select a branch.";
    }
    if (!colleges.includes(form.college)) {
      return "Please select a college.";
    }
    return null;
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const { error: serverError } = await res.json();
        throw new Error(serverError || "Something went wrong");
      }

      // If registration was successful, you could redirect or show a success message
      router.push("/"); // for example, redirect to homepage
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <h1>Register / Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        {error && <p className="error">{error}</p>}

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="10-digit phone number"
          required
        />

        <label htmlFor="branch">Branch:</label>
        <select
          id="branch"
          name="branch"
          value={form.branch}
          onChange={handleChange}
        >
          {branches.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <label htmlFor="college">College:</label>
        <select
          id="college"
          name="college"
          value={form.college}
          onChange={handleChange}
        >
          {colleges.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
        >
          {loading ? "Saving..." : "Submit"}
        </button>
      </form>

      <style jsx>{`
        .login-page {
          max-width: 480px;
          margin: 2rem auto;
          padding: 2rem;
          background-color: var(--color-white);
          border: 2px solid var(--color-primary);
          border-radius: 0.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        h1 {
          text-align: center;
          color: var(--color-primary);
          margin-bottom: 1rem;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        label {
          font-weight: 600;
          color: var(--color-secondary);
        }
        input,
        select {
          padding: 0.5rem;
          border: 1px solid var(--color-accent);
          border-radius: 0.25rem;
          font-size: 1rem;
        }
        input:focus,
        select:focus {
          outline: none;
          border-color: var(--color-primary);
        }
        .error {
          color: #e53935;
          font-weight: 500;
          text-align: center;
        }
        .btn-primary {
          background-color: var(--color-primary);
          color: var(--color-on-primary);
          padding: 0.75rem;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: background-color 0.2s ease;
        }
        .btn-primary:hover {
          background-color: var(--color-secondary);
        }
        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}