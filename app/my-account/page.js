import { LogOut } from "lucide-react";
import { logoutAction } from "../data/actions/auth-actions";

export default function DashboardPage() {
  return (
    <>
      <div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
          <h1>Dashboard</h1>
        </div>
        <form action={logoutAction}>
          <button type="submit">
            <LogOut className="w-6 h-6 hover:text-primary" />
          </button>
        </form>
      </div>
    </>
  );
}
