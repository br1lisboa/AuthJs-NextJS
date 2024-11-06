import { LogoutButton } from "@/components/LogoutButton";

export default function () {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-10 py-4">
      <h2>Private pages</h2>
      <LogoutButton />
    </div>
  );
}
