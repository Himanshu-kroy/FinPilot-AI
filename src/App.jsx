import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import { FinancialProvider } from "@/context/FinancialContext";

export default function App() {
  return (
    <FinancialProvider>
      <RouterProvider router={router} />
    </FinancialProvider>
  );
}
