"use client";

import { Mail } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import Modal from "./Modal";
import { experience, teaching, contact } from "@/data/portfolio";
import type { NavModalKey } from "./NavModalContext";

export default function NavModals({
  active,
  onClose,
}: {
  active: NavModalKey | null;
  onClose: () => void;
}) {
  if (active === "experience") {
    return (
      <Modal title="~/experience" onClose={onClose}>
        <div className="space-y-6">
          {experience.map((job) => (
            <div key={job.role + job.org} className="border-b border-border pb-5 last:border-0 last:pb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p className="font-semibold text-fg">{job.role}</p>
                <p className="shrink-0 text-xs text-muted">{job.dates}</p>
              </div>
              <p className="mb-2 text-sm text-accent-dim">
                {job.org} <span className="text-muted">— {job.location}</span>
              </p>
              <ul className="space-y-1">
                {job.bullets.map((bullet) => (
                  <li key={bullet} className="text-sm text-muted">
                    <span className="text-accent">&gt;</span> {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Modal>
    );
  }

  if (active === "teaching") {
    return (
      <Modal title="~/teaching" onClose={onClose}>
        <ul className="space-y-4">
          {teaching.map((course) => (
            <li key={course.course} className="border-b border-border pb-4 last:border-0 last:pb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p className="font-semibold text-accent">{course.course}</p>
                <p className="shrink-0 text-xs text-muted">{course.dates}</p>
              </div>
              <p className="text-sm text-muted">{course.title}</p>
            </li>
          ))}
        </ul>
      </Modal>
    );
  }

  if (active === "contact") {
    return (
      <Modal title="~/contact" onClose={onClose}>
        <div className="space-y-3 text-sm">
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-2 text-accent hover:underline"
          >
            <Mail className="h-4 w-4 shrink-0" />
            {contact.email}
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-accent hover:underline"
          >
            <FaLinkedin className="h-4 w-4 shrink-0" />
            linkedin.com/in/kayan-mohamed
          </a>
        </div>
      </Modal>
    );
  }

  return null;
}
