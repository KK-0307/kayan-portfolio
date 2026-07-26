import TerminalPanel from "./TerminalPanel";
import Portrait from "./Portrait";
import { profile } from "@/data/portfolio";

export default function WhoAmI() {
  return (
    <TerminalPanel title="~/home/whoami" className="flex-1" id="home">
      <div className="flex flex-col-reverse gap-8 md:flex-row">
        <div className="flex-1">
          <p className="text-muted text-sm mb-4">
            <span className="text-accent">{profile.handle}</span>:~$ cat about_me.txt
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Hi, I&apos;m <span className="text-accent">{profile.name}</span>.
          </h1>

          <div className="space-y-1 text-lg text-fg/90 mb-4">
            {profile.roles.map((role) => (
              <p key={role}>{role}</p>
            ))}
          </div>

          <p className="text-muted mb-6 max-w-md">{profile.bio}</p>

          <p className="text-muted text-sm mb-2">
            <span className="text-accent">{profile.handle}</span>:~$ ls current_focus/
          </p>
          <ul className="space-y-1 mb-4">
            {profile.currentFocus.map((focus) => (
              <li key={focus} className="text-accent-dim">
                <span className="text-muted">&gt; </span>
                {focus}/
              </li>
            ))}
          </ul>

          <p className="text-muted text-sm">
            <span className="text-accent">{profile.handle}</span>:~${" "}
            <span className="inline-block h-4 w-2 bg-accent cursor-blink align-middle" />
          </p>
        </div>

        <Portrait className="mx-auto md:mx-0 md:w-56" />
      </div>
    </TerminalPanel>
  );
}
